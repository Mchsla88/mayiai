
import { Metadata } from 'next'
import { ClipperClient } from './clipper-client'

export const metadata: Metadata = {
  title: 'Video Clipper - Content Studio',
}

export default function ClipperPage() {
  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Video Clipper 🎬</h1>
        <p className="text-muted-foreground">Twórz viralowe szorty lub dodaj lektora AI do swoich nagrań.</p>
      </div>
      
      <ClipperClient />
    </div>
  )
}
