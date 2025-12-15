
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { createAutomationRule, deleteAutomationRule } from '../actions'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export function RulesClient({ rules }: { rules: any[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [newRule, setNewRule] = useState({
    keyword: '',
    actionType: 'DM_AND_REPLY',
    dmContent: '',
    replyContent: '',
    useAi: false
  })

  // Action Types: DM_AND_REPLY, REPLY_ONLY, DM_ONLY
  
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRule.keyword) {
        toast.error('Słowo kluczowe jest wymagane')
        return
    }

    setLoading(true)
    try {
      await createAutomationRule(newRule)
      toast.success('Reguła dodana!')
      setNewRule({
        keyword: '',
        actionType: 'DM_AND_REPLY',
        dmContent: '',
        replyContent: '',
        useAi: false
      })
      router.refresh()
    } catch (error) {
      toast.error('Błąd dodawania reguły.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno usunąć tę regułę?')) return
    try {
        await deleteAutomationRule(id)
        toast.success('Usunięto.')
        router.refresh()
    } catch (error) {
        toast.error('Błąd usuwania.')
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Formularz Dodawania */}
      <Card>
        <CardHeader>
          <CardTitle>Nowa Reguła</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <Label>Słowo kluczowe (np. RABAT)</Label>
              <Input 
                value={newRule.keyword} 
                onChange={e => setNewRule({...newRule, keyword: e.target.value})}
                placeholder="Wpisz słowo..."
              />
            </div>
            
            <div className="space-y-2">
              <Label>Typ Akcji</Label>
              <Select 
                value={newRule.actionType} 
                onValueChange={val => setNewRule({...newRule, actionType: val})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DM_AND_REPLY">Wyślij DM + Odpowiedz</SelectItem>
                  <SelectItem value="DM_ONLY">Tylko DM</SelectItem>
                  <SelectItem value="REPLY_ONLY">Tylko Odpowiedz</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(newRule.actionType.includes('DM')) && (
                <div className="space-y-2">
                    <Label>Treść Wiadomości Prywatnej (DM)</Label>
                    <Textarea 
                        value={newRule.dmContent} 
                        onChange={e => setNewRule({...newRule, dmContent: e.target.value})}
                        placeholder="Hej! Oto Twój kod rabatowy..."
                    />
                </div>
            )}

            {(newRule.actionType.includes('REPLY')) && (
                <div className="space-y-4 border p-4 rounded-md">
                    <div className="flex items-center justify-between">
                        <Label>Użyj AI do odpowiedzi</Label>
                        <Switch 
                            checked={newRule.useAi}
                            onCheckedChange={checked => setNewRule({...newRule, useAi: checked})}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label>
                            {newRule.useAi ? 'Instrukcje dla AI' : 'Treść Odpowiedzi'}
                        </Label>
                        <Textarea 
                            value={newRule.replyContent} 
                            onChange={e => setNewRule({...newRule, replyContent: e.target.value})}
                            placeholder={newRule.useAi ? 'Napisz, żeby AI była miła i wspomniała o promocji...' : 'Dzięki za komentarz! Sprawdź DM 📥'}
                        />
                    </div>
                </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Dodawanie...' : 'Dodaj Regułę'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Lista Reguł */}
      <div className="space-y-4">
         <h2 className="text-xl font-semibold">Istniejące Reguły</h2>
         {rules.length === 0 && <p className="text-gray-500">Brak reguł.</p>}
         {rules.map(rule => (
             <Card key={rule.id} className="relative">
                 <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(rule.id)}
                 >
                     <Trash2 className="h-4 w-4" />
                 </Button>
                 <CardHeader className="pb-2">
                     <CardTitle className="text-lg">"{rule.keyword}"</CardTitle>
                 </CardHeader>
                 <CardContent className="text-sm space-y-2">
                     <div className="flex gap-2">
                        <span className="font-semibold">Akcja:</span>
                        <span>{rule.actionType}</span>
                     </div>
                     {rule.actionType.includes('DM') && (
                         <div>
                            <span className="font-semibold block">DM:</span>
                            <p className="text-gray-600 truncate">{rule.dmContent}</p>
                         </div>
                     )}
                     {rule.actionType.includes('REPLY') && (
                         <div>
                            <span className="font-semibold block">
                                Reply ({rule.useAi ? 'AI' : 'Static'}):
                            </span>
                            <p className="text-gray-600 truncate">{rule.replyContent}</p>
                         </div>
                     )}
                 </CardContent>
             </Card>
         ))}
      </div>
    </div>
  )
}
