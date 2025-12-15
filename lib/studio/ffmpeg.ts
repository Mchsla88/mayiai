
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import fs from 'fs'
import os from 'os'
import ffmpegPath from 'ffmpeg-static'
import { path as ffprobePath } from 'ffprobe-static'

// Set Paths
if (ffmpegPath) ffmpeg.setFfmpegPath(ffmpegPath)
if (ffprobePath) ffmpeg.setFfprobePath(ffprobePath)

// Helper for time format conversion (MM:SS to seconds)
function parseTime(timeStr: string): number {
    const parts = timeStr.split(':')
    if (parts.length === 2) {
        return parseInt(parts[0]) * 60 + parseInt(parts[1])
    }
    return 0
}

export class VideoEditor {
    
    static async cutClip(inputFile: string, start: string, end: string, targetDir: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const outputDir = path.join(os.tmpdir(), 'mayiai_generated')
            if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })
            
            const filename = `clip_${Date.now()}_${start.replace(':','-')}.mp4`
            const outputPath = path.join(outputDir, filename)
            
            console.log(`[FFmpeg] Cutting ${start} to ${end}`)
            
            ffmpeg(inputFile)
                .setStartTime(start)
                .setDuration(parseTime(end) - parseTime(start))
                .output(outputPath)
                .on('end', () => {
                    console.log('[FFmpeg] Cut finished:', outputPath)
                    resolve(outputPath)
                })
                .on('error', (err) => {
                    console.error('[FFmpeg] Error:', err)
                    reject(err)
                })
                .run()
        })
    }

    static async addVoiceover(videoFile: string, audioFile: string, targetDir: string): Promise<string> {
         return new Promise((resolve, reject) => {
            const outputDir = path.join(os.tmpdir(), 'mayiai_generated')
            if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })
            
            const filename = `narrated_${Date.now()}.mp4`
            const outputPath = path.join(outputDir, filename)
            
            console.log(`[FFmpeg] Merging Video + Voiceover`)
            
            // Logic: Take Video (no audio) + Input Audio -> Output
            // Use -c:v copy to be fast (no re-encoding video if possible), or re-encode if needed.
            // Safe bet: re-encode audio to aac, copy video if format matches. 
            // BUT: If video is longer/shorter? We'll trim video to audio length or loop.
            // Simple MVP: Just replace audio.
            
            ffmpeg()
                .input(videoFile)
                .input(audioFile)
                .outputOptions([
                    '-map 0:v',      // Take video from input 0
                    '-map 1:a',      // Take audio from input 1
                    '-c:v copy',     // Copy video stream (fast)
                    '-shortest'      // Stop when shortest stream ends (usually audio)
                ])
                .save(outputPath)
                .on('end', () => {
                    console.log('[FFmpeg] Merge finished:', outputPath)
                    resolve(outputPath)
                })
                .on('error', (err) => {
                    console.error('[FFmpeg] Error:', err)
                    reject(err)
                })
         })
    }
}
