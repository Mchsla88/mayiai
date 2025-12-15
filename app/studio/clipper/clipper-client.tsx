
'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { toast } from 'react-hot-toast'
import { Video, Mic, Wand2, FileVideo } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { processVideoProject } from '../actions' // Import action

export function ClipperClient() {
    const [loading, setLoading] = useState(false)
    const [mode, setMode] = useState<'AUTO_CLIPS' | 'AI_NARRATOR'>('AUTO_CLIPS')
    const [sourceType, setSourceType] = useState<'URL' | 'FILE'>('URL')
    const [source, setSource] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [prompt, setPrompt] = useState('')
    
    // Narrator Settings
    const [voice, setVoice] = useState('alloy')
    const [music, setMusic] = useState('none')

    const handleSubmit = async () => {
        if (sourceType === 'URL' && !source) return toast.error('Podaj link')
        if (sourceType === 'FILE' && !file) return toast.error('Wybierz plik')
        
        setLoading(true)
        toast.loading('Przesyłanie zadania...')
        
        const formData = new FormData()
        formData.append('mode', mode)
        formData.append('prompt', prompt)
        formData.append('voice', voice)
        
        if (sourceType === 'URL') {
             formData.append('sourceUrl', source)
        } else if (file) {
             formData.append('videoFile', file)
        }

        try {
            const res = await processVideoProject(formData)
            toast.dismiss()
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success('Rozpoczęto przetwarzanie! Sprawdź status w "Projekty".')
                // Optional: redirect to projects
            }
        } catch (e) {
            toast.error('Błąd połączenia')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <Card className={`cursor-pointer transition-all border-2 ${mode === 'AUTO_CLIPS' ? 'border-primary bg-primary/5' : 'border-transparent'}`} onClick={() => setMode('AUTO_CLIPS')}>
                    <CardContent className="p-6 text-center">
                        <Video className="w-10 h-10 mx-auto mb-3 text-blue-500" />
                        <h3 className="font-bold">Auto-Shorts</h3>
                        <p className="text-sm text-muted-foreground">Wytnij viralowe klipy z długiego nagrania (Webinar, Podcast).</p>
                    </CardContent>
                </Card>

                <Card className={`cursor-pointer transition-all border-2 ${mode === 'AI_NARRATOR' ? 'border-primary bg-primary/5' : 'border-transparent'}`} onClick={() => setMode('AI_NARRATOR')}>
                     <CardContent className="p-6 text-center">
                        <Mic className="w-10 h-10 mx-auto mb-3 text-purple-500" />
                        <h3 className="font-bold">AI Narrator</h3>
                        <p className="text-sm text-muted-foreground">Stwórz lektora i muzykę do b-rollu lub cichego wideo.</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent className="p-6 space-y-5">
                     <div className="space-y-4">
                         <Label>Źródło wideo</Label>
                         <div className="flex gap-2 mb-2">
                             <Button 
                                variant={sourceType === 'URL' ? 'default' : 'outline'} 
                                onClick={() => setSourceType('URL')}
                                className="w-1/2"
                             >
                                Link (YouTube)
                             </Button>
                             <Button 
                                variant={sourceType === 'FILE' ? 'default' : 'outline'} 
                                onClick={() => setSourceType('FILE')}
                                className="w-1/2"
                             >
                                Prześlij Plik
                             </Button>
                         </div>

                         {sourceType === 'URL' ? (
                            <div className="space-y-2">
                                <Input 
                                    placeholder="https://youtube.com/watch?v=..." 
                                    value={source}
                                    onChange={e => setSource(e.target.value)}
                                />
                            </div>
                         ) : (
                            <div className="space-y-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors relative">
                                <Input 
                                    type="file" 
                                    accept="video/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={e => setFile(e.target.files?.[0] || null)}
                                />
                                <div className="pointer-events-none">
                                    <FileVideo className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                    <p className="font-medium">{file ? file.name : 'Kliknij aby wybrać plik wideo'}</p>
                                    <p className="text-xs text-muted-foreground">MP4, MOV (Max 500MB)</p>
                                </div>
                            </div>
                         )}
                     </div>

                     {mode === 'AI_NARRATOR' && (
                         <div className="space-y-4 pt-4 border-t">
                             <div className="space-y-2">
                                <Label>Prompt / Instrukcje dla AI</Label>
                                <Textarea 
                                   placeholder="Opisz co AI ma zrobić, np.: 'To jest reklama butów do biegania. Zrób dynamiczny montaż, podkreśl lekkość i wygodę. Dodaj energicznego lektora.'"
                                   value={prompt}
                                   onChange={e => setPrompt(e.target.value)}
                                   rows={3}
                                />
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-2">
                                     <Label>Głos Lektora (OpenAI)</Label>
                                     <Select value={voice} onValueChange={setVoice}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="alloy">Alloy (Neutralny)</SelectItem>
                                            <SelectItem value="echo">Echo (Męski)</SelectItem>
                                            <SelectItem value="fable">Fable (Brytyjski)</SelectItem>
                                            <SelectItem value="onyx">Onyx (Głęboki)</SelectItem>
                                            <SelectItem value="nova">Nova (Żeński)</SelectItem>
                                            <SelectItem value="shimmer">Shimmer (Jasny)</SelectItem>
                                        </SelectContent>
                                     </Select>
                                 </div>
                                 <div className="space-y-2">
                                     <Label>Muzyka tła</Label>
                                     <Select value={music} onValueChange={setMusic}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Brak</SelectItem>
                                            <SelectItem value="energetic">Energetic Pop</SelectItem>
                                            <SelectItem value="lofi">Lofi Chill</SelectItem>
                                            <SelectItem value="corporate">Corporate Upbeat</SelectItem>
                                        </SelectContent>
                                     </Select>
                                 </div>
                             </div>
                         </div>
                     )}

                     <Button size="lg" className="w-full" onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Przetwarzanie...' : (mode === 'AUTO_CLIPS' ? 'Generuj Klipy' : 'Stwórz AI Wideo')}
                        {!loading && <Wand2 className="w-4 h-4 ml-2" />}
                     </Button>
                </CardContent>
            </Card>
        </div>
    )
}
