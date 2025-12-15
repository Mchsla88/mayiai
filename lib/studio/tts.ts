
import OpenAI from "openai"
import fs from "fs"
import os from "os"
import path from "path"
import { prisma } from "@/lib/prisma"

export async function generateSpeech(text: string, voice: string = "alloy"): Promise<string> {
    // 1. Get Key
    let apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
        const config = await prisma.instagramConfig.findFirst()
        apiKey = config?.openaiApiKey || undefined
    }
    if (!apiKey) throw new Error("Missing OpenAI API Key")

    const openai = new OpenAI({ apiKey })

    // 2. Output Path
    // IGNORE public/generated, force /tmp
    const outputDir = path.join(os.tmpdir(), 'mayiai_generated_audio')

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }
    const filename = `speech_${Date.now()}.mp3`
    const outputPath = path.join(outputDir, filename)

    // 3. Call API
    console.log(`[TTS] Generating speech for: "${text.substring(0, 20)}..."`)
    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: voice as any,
        input: text,
    })

    const buffer = Buffer.from(await mp3.arrayBuffer())
    await fs.promises.writeFile(outputPath, buffer)
    
    console.log(`[TTS] Saved to: ${outputPath}`)
    return outputPath
}
