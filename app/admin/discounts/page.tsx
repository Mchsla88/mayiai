'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Plus, Trash2, Loader2, Tag } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

interface Training {
  id: string
  title: string
}

interface DiscountCode {
  id: string
  code: string
  discount: number
  type: 'PERCENTAGE' | 'FIXED'
  isActive: boolean
  usageLimit: number | null
  usedCount: number
  expiresAt: string | null
  trainingId: string | null
  training?: Training
}

export default function DiscountCodesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [codes, setCodes] = useState<DiscountCode[]>([])
  const [trainings, setTrainings] = useState<Training[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  
  const [newCode, setNewCode] = useState({
    code: '',
    discount: '',
    trainingId: 'all',
    usageLimit: '',
    expiresAt: ''
  })

  useEffect(() => {
    if (status === 'loading') return
    
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/admin/discounts')
      return
    }

    if (session && !session.user?.isAdmin && session.user?.email !== 'michal@mayiai.pl') {
      return
    }

    fetchData()
  }, [status, session, router])

  const fetchData = async () => {
    try {
      const [codesRes, trainingsRes] = await Promise.all([
        fetch('/api/admin/discounts', { cache: 'no-store' }),
        fetch('/api/admin/trainings', { cache: 'no-store' })
      ])
      
      if (codesRes.ok && trainingsRes.ok) {
        setCodes(await codesRes.json())
        setTrainings(await trainingsRes.json())
      }
    } catch (error) {
      toast.error('Błąd pobierania danych')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddCode = async () => {
    if (!newCode.code || !newCode.discount) {
      toast.error('Kod i wartość zniżki są wymagane')
      return
    }

    try {
      const res = await fetch('/api/admin/discounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newCode,
          trainingId: newCode.trainingId === 'all' ? null : newCode.trainingId
        })
      })

      if (res.ok) {
        toast.success('Kod rabatowy dodany')
        setIsAddModalOpen(false)
        setNewCode({
          code: '',
          discount: '',
          trainingId: 'all',
          usageLimit: '',
          expiresAt: ''
        })
        fetchData()
      } else {
        toast.error('Błąd dodawania kodu')
      }
    } catch (error) {
      toast.error('Wystąpił błąd')
    }
  }

  const handleDeleteCode = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć ten kod?')) return

    try {
      const res = await fetch(`/api/admin/discounts?id=${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        toast.success('Kod usunięty')
        fetchData()
      } else {
        toast.error('Błąd usuwania kodu')
      }
    } catch (error) {
      toast.error('Wystąpił błąd')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kody Rabatowe</h1>
          <p className="text-gray-500">Zarządzanie zniżkami i promocjami</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Aktywne kody</CardTitle>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Dodaj kod
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kod</TableHead>
                <TableHead>Zniżka</TableHead>
                <TableHead>Dotyczy</TableHead>
                <TableHead>Użycia</TableHead>
                <TableHead>Wygasa</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {codes.map((code) => (
                <TableRow key={code.id}>
                  <TableCell>
                    <div className="font-mono font-bold text-purple-600 flex items-center gap-2">
                      <Tag className="w-3 h-3" />
                      {code.code}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      -{code.discount}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {code.training ? (
                      <span className="text-sm">{code.training.title}</span>
                    ) : (
                      <Badge variant="outline">Wszystkie szkolenia</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={code.usageLimit && code.usedCount >= code.usageLimit ? "text-red-500 font-medium" : ""}>
                      {code.usedCount} / {code.usageLimit || '∞'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {code.expiresAt ? (
                      new Date(code.expiresAt).toLocaleDateString('pl-PL')
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCode(code.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {codes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Brak kodów rabatowych
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dodaj nowy kod rabatowy</DialogTitle>
            <DialogDescription>
              Utwórz nowy kod zniżkowy dla klientów.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Kod (np. SUMMER2024)</label>
              <Input
                placeholder="WPISZ KOD"
                value={newCode.code}
                onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Zniżka (%)</label>
              <Input
                type="number"
                placeholder="20"
                value={newCode.discount}
                onChange={(e) => setNewCode({ ...newCode, discount: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Dotyczy szkolenia</label>
              <Select 
                value={newCode.trainingId} 
                onValueChange={(val) => setNewCode({ ...newCode, trainingId: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz szkolenie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie szkolenia</SelectItem>
                  {trainings.map((t) => (
                    <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Limit użyć (opcjonalne)</label>
                <Input
                  type="number"
                  placeholder="Brak limitu"
                  value={newCode.usageLimit}
                  onChange={(e) => setNewCode({ ...newCode, usageLimit: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Data ważności (opcjonalne)</label>
                <Input
                  type="date"
                  value={newCode.expiresAt}
                  onChange={(e) => setNewCode({ ...newCode, expiresAt: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Anuluj</Button>
            <Button onClick={handleAddCode}>Utwórz kod</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
