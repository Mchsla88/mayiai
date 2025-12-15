
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { downloadVideo } from '@/lib/studio/downloader'
import { VideoAnalyzer } from '@/lib/studio/video-analyzer'
import { VideoEditor } from '@/lib/studio/ffmpeg'
import { generateSpeech } from '@/lib/studio/tts'
import path from 'path'
import fs from 'fs'

export async function getProjects() {
  return await prisma.contentProject.findMany({
    orderBy: { updatedAt: 'desc' }
  })
}

export async function createProject(data: any) {
  const { title, type, content, status } = data
  return await prisma.contentProject.create({
    data: {
      title,
      type, 
      content,
      status: status || 'DRAFT'
    }
  })
}

export async function updateProjectStatus(id: string, status: string) {
  await prisma.contentProject.update({
    where: { id },
    data: { status }
  })
  revalidatePath('/studio')
  return { success: true }
}

export async function deleteProject(id: string) {
  await prisma.contentProject.delete({ where: { id } })
  revalidatePath('/studio')
  return { success: true }
}

export async function generatePost(topic: string, platform: string, tone: string) {
    try {
        let apiKey = process.env.GEMINI_API_KEY
        if (!apiKey) {
            const config = await prisma.instagramConfig.findFirst()
            apiKey = config?.geminiApiKey || undefined
        }
        if (!apiKey) return { error: 'Brak klucza API Gemini' }

        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

        const prompt = `Post na ${platform}, temat: ${topic}, ton: ${tone}.`
        const result = await model.generateContent(prompt)
        return { content: result.response.text() }
    } catch (error: any) {
        return { error: 'Błąd AI: ' + error.message }
    }
}

// --- VIDEO PROCESSING ENGINE ---

export async function processVideoProject(data: FormData) {
    const sourceUrl = data.get('sourceUrl') as string
    const videoFile = data.get('videoFile') as File
    const mode = data.get('mode') as string // 'AUTO_CLIPS' or 'AI_NARRATOR'
    const prompt = data.get('prompt') as string
    const voice = data.get('voice') as string

    // Determine Source
    let initSource = sourceUrl || 'UPLOADED_FILE'
    
    if (!sourceUrl && !videoFile) return { error: 'Brak źródła' }

    try {
        // 1. Create Project Entry
        const project = await prisma.contentProject.create({
            data: {
                title: `Wideo: ${videoFile?.name || 'YouTube Import'} - ${new Date().toLocaleString()}`,
                type: 'VIDEO_CLIP',
                status: 'PROCESSING',
                sourceUrl: sourceUrl || undefined
            }
        })

        // 2. Start Processing (Wait for completion in Local dev)
        await runVideoPipeline(project.id, { sourceUrl, videoFile }, mode, prompt, voice)

        revalidatePath('/studio')
        return { success: true, projectId: project.id }

    } catch (e: any) {
        console.error(e)
        return { error: e.message }
    }
}

async function runVideoPipeline(projectId: string, input: { sourceUrl?: string, videoFile?: File }, mode: string, prompt: string, voice: string) {
    const DOWNLOADS_DIR = path.join(process.cwd(), 'downloads')
    const OUTPUT_DIR = path.join(process.cwd(), 'public', 'generated', 'video')

    try {
        // A. Acquire File
        let filePath = ''
        
        if (input.videoFile) {
             // Handle Upload
             if (!fs.existsSync(DOWNLOADS_DIR)) fs.mkdirSync(DOWNLOADS_DIR, { recursive: true })
             filePath = path.join(DOWNLOADS_DIR, `upload_${Date.now()}_${input.videoFile.name}`)
             
             const arrayBuffer = await input.videoFile.arrayBuffer()
             const buffer = new Uint8Array(arrayBuffer)
             await fs.promises.writeFile(filePath, buffer)
             
        } else if (input.sourceUrl) {
             // Handle YouTube
             filePath = await downloadVideo(input.sourceUrl, DOWNLOADS_DIR)
        } else {
             throw new Error("No input provided")
        }
        
        // Update DB with local path
        await prisma.contentProject.update({
            where: { id: projectId },
            data: { localPath: filePath }
        })

        // B. Analyze with Gemini
        // Upload first
        const geminiFile = await VideoAnalyzer.uploadVideo(filePath)
        
        if (mode === 'AUTO_CLIPS') {
             const clips = await VideoAnalyzer.generateClips(geminiFile.uri)
             
             // Save clips metadata
             await prisma.contentProject.update({
                 where: { id: projectId },
                 data: { clips: clips as any, aiSummary: "Znaleziono klipy." }
             })
             
             // Cut Clips using FFmpeg
             for (const clip of clips || []) {
                 await VideoEditor.cutClip(filePath, clip.start, clip.end, OUTPUT_DIR)
             }
             
             await prisma.contentProject.update({ where: { id: projectId }, data: { status: 'COMPLETED' } })

        } else if (mode === 'AI_NARRATOR') {
             // Get Script
             const narration = await VideoAnalyzer.generateNarrationScript(geminiFile.uri, prompt)
             
             // Save Script
             await prisma.contentProject.update({
                 where: { id: projectId },
                 data: { 
                     aiSummary: narration?.script,
                     content: JSON.stringify(narration)
                 }
             })

             if (narration?.script) {
                 // Generate Audio
                 const audioPath = await generateSpeech(narration.script, voice)
                 
                 // Merge
                 const finalVideo = await VideoEditor.addVoiceover(filePath, audioPath, OUTPUT_DIR)
                 
                 // Save result path (e.g. into clips or a new field, for now putting in Summary or Description?)
                 // Let's store in 'clips' as a single result
                 await prisma.contentProject.update({
                     where: { id: projectId },
                     data: { 
                        status: 'COMPLETED',
                        clips: [{ 
                            start: '00:00', end: 'FULL', 
                            path: '/generated/video/' + path.basename(finalVideo),
                            description: "Final AI Narrated Video"
                        }]
                     }
                 })
             }
        }

    } catch (e: any) {
        console.error("[Video Pipeline Error]", e)
        
        // Try to save error to DB for debugging
        try {
            await prisma.contentProject.update({
                where: { id: projectId },
                data: { 
                    status: 'FAILED',
                    aiSummary: `BŁĄD: ${e.message || 'Unknown error'}`
                } 
            })
        } catch (dbErr) {
            console.error("Failed to save error status", dbErr)
        }

        throw new Error(`Pipeline Failed: ${e.message}`)
    }
}
