
import path from 'path'
import fs from 'fs'
import os from 'os'
import ytdl from '@distube/ytdl-core'

export async function downloadVideo(url: string, targetDir: string): Promise<string> {
    // IGNORE targetDir, force /tmp for Vercel
    const outputDir = path.join(os.tmpdir(), 'mayiai_downloads')

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    const timestamp = Date.now()
    const filename = `video_${timestamp}.mp4`
    const outputPath = path.join(outputDir, filename)

    console.log(`[Downloader] Starting download (ytdl): ${url}`)

    return new Promise((resolve, reject) => {
        try {
            const videoStream = ytdl(url, { quality: 'highestvideo', filter: 'audioandvideo' })
            const writeStream = fs.createWriteStream(outputPath)
            
            videoStream.pipe(writeStream)
            
            writeStream.on('finish', () => {
                console.log(`[Downloader] Completed: ${outputPath}`)
                resolve(outputPath)
            })
            
            writeStream.on('error', (err) => {
                console.error('[Downloader] Stream Error:', err)
                reject(err)
            })
        } catch (error) {
             console.error('[Downloader] Error:', error)
             reject(error)
        }
    })
}
