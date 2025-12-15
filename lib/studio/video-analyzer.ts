
import { GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleAIFileManager, FileState } from "@google/generative-ai/server"
import { prisma } from "@/lib/prisma"

// --- TYPES ---
interface VideoAnalysisResult {
    clips?: Array<{
        start: string
        end: string
        score: number
        description: string
        virality_explanation: string
    }>
    narration?: {
        script: string
        tone: string
        suggested_music: string
    }
}

// --- HELPERS ---
async function getApiKey() {
    let apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
        const config = await prisma.instagramConfig.findFirst()
        apiKey = config?.geminiApiKey || undefined
    }
    if (!apiKey) throw new Error("Missing Gemini API Key")
    return apiKey
}

// --- EXPORTED SERVICE ---
export class VideoAnalyzer {
    
    // 1. Upload Video to Gemini
    static async uploadVideo(filePath: string, mimeType: string = "video/mp4") {
        const apiKey = await getApiKey()
        const fileManager = new GoogleAIFileManager(apiKey)
        
        console.log(`[Analyzer] Uploading file: ${filePath}`)
        const uploadResponse = await fileManager.uploadFile(filePath, {
            mimeType,
            displayName: "Content Studio File"
        })
        
        console.log(`[Analyzer] Uploaded. URI: ${uploadResponse.file.uri}`)
        
        // Wait for processing
        let file = await fileManager.getFile(uploadResponse.file.name)
        while (file.state === FileState.PROCESSING) {
            console.log(`[Analyzer] Processing...`)
            await new Promise(resolve => setTimeout(resolve, 5000)) // Wait 5s
            file = await fileManager.getFile(uploadResponse.file.name)
        }
        
        if (file.state === FileState.FAILED) {
            throw new Error("Video processing failed by Gemini")
        }
        
        console.log(`[Analyzer] Ready for analysis.`)
        return file
    }

    // 2. Analyze for Clips (Auto-Shorts)
    static async generateClips(fileUri: string): Promise<VideoAnalysisResult['clips']> {
        const apiKey = await getApiKey()
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

        const prompt = `
        You are a viral content expert. Watch this video carefully.
        Identify 3-5 distinct segments (15-60 seconds long) that would make EXCELLENT viral Shorts/Reels.
        
        CRITERIA:
        - High energy or emotional value.
        - Standalone meaning (makes sense without context).
        - Good visual or audio hook.
        
        Output ONLY valid JSON in this format:
        [
            {
                "start": "MM:SS",
                "end": "MM:SS",
                "score": 95,
                "description": "One sentence summary",
                "virality_explanation": "Why this is viral"
            }
        ]
        `

        const result = await model.generateContent([
            { fileData: { mimeType: "video/mp4", fileUri } },
            { text: prompt }
        ])
        
        const text = result.response.text()
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim()
        
        try {
            return JSON.parse(jsonStr)
        } catch (e) {
            console.error("Failed to parse JSON", text)
            console.log("Raw Text:", text)
            // Fallback empty
            return []
        }
    }

    // 3. Generate Narration (AI Narrator)
    static async generateNarrationScript(fileUri: string, userPrompt: string): Promise<VideoAnalysisResult['narration']> {
        const apiKey = await getApiKey()
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

        const prompt = `
        You are a professional video editor and copywriter.
        Watch this video.
        
        USER INSTRUCTION: "${userPrompt}"
        
        Task: Write a voiceover script that matches the visuals of this video.
        The script should be perfectly timed to the video length (or slightly shorter).
        
        Output ONLY valid JSON:
        {
            "script": "The actual text for the narrator to read...",
            "tone": "suggested tone (e.g. Energetic, Calm)",
            "suggested_music": "Description of background music"
        }
        `

        const result = await model.generateContent([
            { fileData: { mimeType: "video/mp4", fileUri } },
            { text: prompt }
        ])
        
        const text = result.response.text()
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim()
        
        return JSON.parse(jsonStr)
    }
}
