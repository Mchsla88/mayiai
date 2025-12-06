'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
import { Badge } from '@/components/ui/badge'
import { Search, ArrowLeft, Loader2, Shield } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface DeletedUser {
  id: string
  email: string
  name: string | null
  reason: string | null
  deletedAt: string
  deletedBy: string | null
  originalCreatedAt: string
}

export default function DeletedUsersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [deletedUsers, setDeletedUsers] = useState<DeletedUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (status === 'loading') return
    
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/admin/deleted-users')
      return
    }

    if (session && !session.user?.isAdmin && session.user?.email !== 'michal@mayiai.pl') {
      return
    }

    if (session) {
      fetchDeletedUsers()
    }
  }, [status, session, router])

  const fetchDeletedUsers = async () => {
    try {
      const res = await fetch('/api/admin/deleted-users', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setDeletedUsers(data)
      } else {
        toast.error('Błąd pobierania historii')
      }
    } catch (error) {
      console.error('Error fetching deleted users:', error)
      toast.error('Błąd połączenia')
    } finally {
      setIsLoading(false)
    }
  }

  // Access Denied View
  if (session && !session.user?.isAdmin && session.user?.email !== 'michal@mayiai.pl') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Shield className="w-16 h-16 text-red-500" />
        <h1 className="text-2xl font-bold text-gray-900">Brak uprawnień administratora</h1>
        <Button onClick={() => router.push('/')}>Wróć na stronę główną</Button>
      </div>
    )
  }

  const filteredUsers = deletedUsers.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Historia usuniętych użytkowników</h1>
          <p className="text-gray-500">Archiwum kont usuniętych z systemu</p>
        </div>
        <Link href="/admin">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Wróć do panelu
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Usunięci użytkownicy</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Szukaj po emailu..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Użytkownik</TableHead>
                <TableHead>Data usunięcia</TableHead>
                <TableHead>Usunięty przez</TableHead>
                <TableHead>Powód</TableHead>
                <TableHead>Data rejestracji (oryginalna)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name || 'Bez nazwy'}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        {new Date(user.deletedAt).toLocaleString('pl-PL')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{user.deletedBy || 'System'}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-500 italic">{user.reason || '-'}</span>
                    </TableCell>
                    <TableCell>
                      {new Date(user.originalCreatedAt).toLocaleDateString('pl-PL')}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Brak usuniętych użytkowników w historii
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
