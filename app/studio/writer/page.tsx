
import { Metadata } from 'next'
import { WriterClient } from './writer-client'

export const metadata: Metadata = {
  title: 'AI Writer - Content Studio',
}

export default function WriterPage() {
  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Writer ✍️</h1>
        <p className="text-muted-foreground">Generuj posty, artykuły i scenariusze w kilka sekund.</p>
      </div>
      
      <WriterClient />
    </div>
  )
}
