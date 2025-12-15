
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { generatePost, createProject } from '../actions'
import { toast } from 'react-hot-toast'
import { Sparkles, Save, Copy } from 'lucide-react'

export function WriterClient() {
  const [loading, setLoading] = useState(false)
  const [topic, setTopic] = useState('')
  const [platform, setPlatform] = useState('LINKEDIN')
  const [tone, setTone] = useState('PROFESSIONAL')
  const [result, setResult] = useState('')

  const handleGenerate = async () => {
    if (!topic) return toast.error('Podaj temat')
    setLoading(true)
    const res = await generatePost(topic, platform, tone)
    setLoading(false)
    
    if (res.error) {
        toast.error(res.error)
    } else {
        setResult(res.content || '')
        toast.success('Wygenerowano!')
    }
  }

  const handleSave = async () => {
    if (!result) return
    try {
        await createProject({
            title: `Post: ${topic.substring(0, 30)}...`,
            type: 'SOCIAL_POST',
            content: result,
            status: 'DRAFT'
        })
        toast.success('Zapisano w projektach')
    } catch {
        toast.error('Błąd zapisu')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    toast.success('Skopiowano')
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 h-full">
        {/* INPUT */}
        <Card className="h-full">
            <CardContent className="p-6 space-y-6">
                <div>
                   <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                      Konfiguracja
                   </h2>
                   
                   <div className="space-y-4">
                       <div className="space-y-2">
                           <Label>Temat / O czym chcesz napisać?</Label>
                           <Textarea 
                              rows={5}
                              placeholder="Np. Zalety sztucznej inteligencji w edukacji dzieci..."
                              value={topic}
                              onChange={e => setTopic(e.target.value)}
                           />
                       </div>

                       <div className="space-y-2">
                           <Label>Platforma</Label>
                           <Select value={platform} onValueChange={setPlatform}>
                               <SelectTrigger>
                                   <SelectValue />
                               </SelectTrigger>
                               <SelectContent>
                                   <SelectItem value="LINKEDIN">LinkedIn (Profesjonalny)</SelectItem>
                                   <SelectItem value="INSTAGRAM">Instagram (Wizualny)</SelectItem>
                                   <SelectItem value="TIKTOK">TikTok (Scenariusz)</SelectItem>
                                   <SelectItem value="FACEBOOK">Facebook (Społeczność)</SelectItem>
                               </SelectContent>
                           </Select>
                       </div>

                       <div className="space-y-2">
                           <Label>Ton wypowiedzi</Label>
                           <Select value={tone} onValueChange={setTone}>
                               <SelectTrigger>
                                   <SelectValue />
                               </SelectTrigger>
                               <SelectContent>
                                   <SelectItem value="PROFESSIONAL">Profesjonalny / Ekspercki</SelectItem>
                                   <SelectItem value="CASUAL">Luźny / Koleżeński</SelectItem>
                                   <SelectItem value="HUMOROUS">Zabawny / Z dystansem</SelectItem>
                                   <SelectItem value="STORYTELLING">Storytelling (Opowieść)</SelectItem>
                               </SelectContent>
                           </Select>
                       </div>

                       <Button 
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                          onClick={handleGenerate}
                          disabled={loading}
                       >
                           {loading ? 'Generowanie AI...' : 'Stwórz Post'}
                       </Button>
                   </div>
                </div>
            </CardContent>
        </Card>

        {/* OUTPUT */}
        <Card className="h-full bg-gray-50/50">
             <CardContent className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Wynik</h2>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={handleCopy} disabled={!result}>
                            <Copy className="w-4 h-4 mr-2" /> Kopiuj
                        </Button>
                        <Button size="sm" variant="default" onClick={handleSave} disabled={!result}>
                            <Save className="w-4 h-4 mr-2" /> Zapisz
                        </Button>
                    </div>
                </div>
                
                <Textarea 
                    className="flex-1 min-h-[400px] font-mono text-sm bg-white"
                    placeholder="Tutaj pojawi się wygenerowana treść..."
                    value={result}
                    onChange={e => setResult(e.target.value)}
                />
             </CardContent>
        </Card>
    </div>
  )
}
