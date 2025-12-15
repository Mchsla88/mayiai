
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, MoreHorizontal, Video, PenTool, Trash2, ArrowRight } from 'lucide-react'
import { createProject, updateProjectStatus, deleteProject } from './actions'
import { toast } from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export function ProjectBoard({ projects }: { projects: any[] }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const columns = [
    { id: 'DRAFT', title: '💡 Pomysły', color: 'bg-yellow-50 border-yellow-200' },
    { id: 'PROCESSING', title: '⚙️ W toku', color: 'bg-blue-50 border-blue-200' },
    { id: 'COMPLETED', title: '✅ Opublikowane / Gotowe', color: 'bg-green-50 border-green-200' }
  ]

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
      await createProject({
        title: formData.get('title'),
        type: formData.get('type'),
        content: formData.get('description'),
        status: 'DRAFT'
      })
      toast.success('Dodano pomysł')
      setIsDialogOpen(false)
    } catch {
      toast.error('Błąd')
    }
  }

  const moveStatus = async (id: string, newStatus: string) => {
    await updateProjectStatus(id, newStatus)
    toast.success('Przeniesiono')
  }

  const handleDelete = async (id: string) => {
    if(confirm('Usunąć?')) {
        await deleteProject(id)
        toast.success('Usunięto')
    }
  }

  return (
    <div>
        <div className="flex justify-end mb-6">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button><Plus className="w-4 h-4 mr-2" /> Nowy Projekt</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Dodaj nowy pomysł</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Tytuł</Label>
                            <Input name="title" required placeholder="np. Film o AI w szkole" />
                        </div>
                        <div className="space-y-2">
                            <Label>Typ</Label>
                            <Select name="type" defaultValue="SOCIAL_POST">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="SOCIAL_POST">Post (Tekst)</SelectItem>
                                    <SelectItem value="VIDEO_CLIP">Wideo (Clipper)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label>Notatki / Opis</Label>
                            <Textarea name="description" placeholder="Krótki opis pomysłu..." />
                        </div>
                        <Button type="submit" className="w-full">Zapisz</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>

        <div className="grid md:grid-cols-3 gap-6 overflow-x-auto pb-4">
            {columns.map(col => (
                <div key={col.id} className={`rounded-xl border p-4 min-h-[500px] ${col.color}`}>
                    <h3 className="font-semibold mb-4 flex items-center justify-between">
                        {col.title}
                        <span className="text-xs bg-white/50 px-2 py-1 rounded-full">
                            {projects.filter(p => p.status === col.id).length}
                        </span>
                    </h3>
                    
                    <div className="space-y-3">
                        {projects.filter(p => p.status === col.id).map(project => (
                            <Card key={project.id} className="shadow-sm hover:shadow-md transition-shadow bg-white">
                                <CardHeader className="p-4 pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-sm font-medium leading-tight">
                                            {project.title}
                                        </CardTitle>
                                        {project.type === 'VIDEO_CLIP' ? (
                                            <Video className="w-4 h-4 text-purple-500 shrink-0" />
                                        ) : (
                                            <PenTool className="w-4 h-4 text-blue-500 shrink-0" />
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                        {project.content || project.aiSummary || 'Brak opisu'}
                                    </p>
                                </CardHeader>
                                <CardFooter className="p-2 pt-0 flex justify-between bg-gray-50/50 rounded-b-lg border-t mt-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-600" onClick={() => handleDelete(project.id)}>
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                    
                                    <div className="flex gap-1">
                                         {col.id !== 'DRAFT' && (
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveStatus(project.id, 'DRAFT')}>
                                                <span className="text-xs">🔙</span>
                                            </Button>
                                        )}
                                        {col.id !== 'COMPLETED' && (
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveStatus(project.id, col.id === 'DRAFT' ? 'PROCESSING' : 'COMPLETED')}>
                                                <ArrowRight className="w-3 h-3" />
                                            </Button>
                                        )}
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
