
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { saveInstagramConfig } from './actions'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export function InstagramSettingsForm({ initialConfig }: { initialConfig: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    pageId: initialConfig?.pageId || '',
    accessToken: initialConfig?.accessToken || '',
    verifyToken: initialConfig?.verifyToken || '',
    openaiApiKey: initialConfig?.openaiApiKey || '',
    geminiApiKey: initialConfig?.geminiApiKey || '',
    activeAiProvider: initialConfig?.activeAiProvider || 'OPENAI',
    systemPrompt: initialConfig?.systemPrompt || 'You are a helpful assistant on Instagram.'
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await saveInstagramConfig(formData)
      toast.success('Konfiguracja zapisana!')
      router.refresh()
    } catch (error) {
      toast.error('Błąd zapisu.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Konfiguracja Połączenia</CardTitle>
        <CardDescription>Wprowadź dane z Meta for Developers oraz klucze API.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pageId">Facebook Page ID</Label>
              <Input 
                id="pageId" 
                value={formData.pageId} 
                onChange={e => handleChange('pageId', e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="verifyToken">Verify Token (Webhook)</Label>
              <Input 
                id="verifyToken" 
                value={formData.verifyToken} 
                onChange={e => handleChange('verifyToken', e.target.value)} 
                placeholder="Twoje tajne hasło dla webhooka"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accessToken">Page Access Token (Long Lived)</Label>
            <Input 
              id="accessToken" 
              type="password"
              value={formData.accessToken} 
              onChange={e => handleChange('accessToken', e.target.value)} 
              required 
            />
          </div>

          <div className="border-t pt-4 mt-6">
            <h3 className="font-semibold mb-4">Konfiguracja AI</h3>
            <div className="grid gap-4 md:grid-cols-2">
               <div className="space-y-2">
                <Label>Domyślny model AI</Label>
                <Select 
                    value={formData.activeAiProvider} 
                    onValueChange={val => handleChange('activeAiProvider', val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz providera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OPENAI">OpenAI (GPT-3.5/4)</SelectItem>
                    <SelectItem value="GEMINI">Google Gemini</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div className="space-y-2">
                <Label htmlFor="openaiKey">OpenAI API Key</Label>
                <Input 
                  id="openaiKey" 
                  type="password"
                  value={formData.openaiApiKey} 
                  onChange={e => handleChange('openaiApiKey', e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="geminiKey">Gemini API Key</Label>
                <Input 
                  id="geminiKey" 
                  type="password"
                  value={formData.geminiApiKey} 
                  onChange={e => handleChange('geminiApiKey', e.target.value)} 
                />
              </div>
            </div>
             
             <div className="space-y-2 mt-4">
               <Label htmlFor="systemPrompt">Globalny System Prompt</Label>
               <Textarea
                 id="systemPrompt"
                 rows={4}
                 value={formData.systemPrompt}
                 onChange={e => handleChange('systemPrompt', e.target.value)}
                 placeholder="Instrukcje dla AI, np. 'Bądź miłym asystentem...'"
               />
             </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Zapisywanie...' : 'Zapisz zmiany'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
