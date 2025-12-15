
import { Metadata } from 'next'
import { getProjects } from './actions'
import { ProjectBoard } from './project-board'

export const metadata: Metadata = {
  title: 'Content Studio',
}

export default async function StudioPage() {
  const projects = await getProjects()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Tablica Pomysłów</h1>
        <p className="text-muted-foreground">Zarządzaj swoimi materiałami wideo i postami.</p>
      </div>
      
      <ProjectBoard projects={projects} />
    </div>
  )
}
