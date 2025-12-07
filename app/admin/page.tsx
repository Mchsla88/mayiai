'use client'

import Link from 'next/link'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
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
import { Search, Shield, Key, Ban, CheckCircle, XCircle, Loader2, Gift, Trash2, Info, ShoppingCart } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TrainingAccess {
  title: string
  grantedAt: string
}

interface User {
  id: string
  name: string | null
  email: string
  role: string
  isAdmin: boolean
  createdAt: string
  trainings: TrainingAccess[]
}

interface Training {
  id: string
  title: string
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [trainings, setTrainings] = useState<Training[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  
  // Modal states
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false)
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [selectedTrainingId, setSelectedTrainingId] = useState<string>('')
  const [newUserData, setNewUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    // Check authentication
    if (status === 'loading') return
    
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/admin')
      return
    }

    if (session && !session.user?.isAdmin && session.user?.email !== 'michal@mayiai.pl') {
      // Don't redirect immediately, show access denied screen
      return
    }

    if (session) {
      fetchData()
    }
  }, [status, session, router])

  // Access Denied View
  if (session && !session.user?.isAdmin && session.user?.email !== 'michal@mayiai.pl') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Shield className="w-16 h-16 text-red-500" />
        <h1 className="text-2xl font-bold text-gray-900">Brak uprawnień administratora</h1>
        <p className="text-gray-600">
          Zalogowano jako: <span className="font-semibold">{session.user?.email}</span>
        </p>
        <div className="flex gap-4 mt-4">
          <Button onClick={() => signOut({ callbackUrl: '/admin' })} variant="outline">
            Wyloguj się
          </Button>
          <Button onClick={() => router.push('/')}>
            Wróć na stronę główną
          </Button>
        </div>
      </div>
    )
  }

  const fetchData = async () => {
    try {
      const [usersRes, trainingsRes] = await Promise.all([
        fetch('/api/admin/users', { cache: 'no-store' }),
        fetch('/api/admin/trainings', { cache: 'no-store' })
      ])
      
      if (usersRes.ok && trainingsRes.ok) {
        const usersData = await usersRes.json()
        const trainingsData = await trainingsRes.json()
        console.log('Fetched trainings:', trainingsData)
        setUsers(usersData)
        setTrainings(trainingsData)
      } else {
        console.error('Fetch error:', usersRes.status, trainingsRes.status)
        toast.error(`Błąd pobierania: Users ${usersRes.status}, Trainings ${trainingsRes.status}`)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Błąd pobierania danych')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    if (!selectedUser || !newPassword) return

    try {
      const res = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUser.id, password: newPassword })
      })

      if (res.ok) {
        toast.success('Hasło zostało zmienione')
        setIsPasswordModalOpen(false)
        setNewPassword('')
      } else {
        toast.error('Błąd zmiany hasła')
      }
    } catch (error) {
      toast.error('Wystąpił błąd')
    }
  }

  const handleGrantAccess = async () => {
    if (!selectedUser || !selectedTrainingId) {
      toast.error('Wybierz użytkownika i szkolenie')
      return
    }

    try {
      console.log('Granting access:', { userId: selectedUser.id, trainingId: selectedTrainingId })
      const res = await fetch('/api/admin/grant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: selectedUser.id, 
          trainingId: selectedTrainingId,
          action: 'grant' 
        })
      })

      if (res.ok) {
        console.log('Access granted successfully')
        toast.success('Przyznano dostęp!')
        setIsAccessModalOpen(false)
        setSelectedTrainingId('')
        setSelectedUser(null)
        await fetchData() // Refresh data
      } else {
        const errorData = await res.json().catch(() => ({}))
        console.error('Grant access error:', errorData)
        toast.error(errorData.error || 'Błąd przyznawania dostępu')
      }
    } catch (error) {
      console.error('Grant access exception:', error)
      toast.error('Wystąpił błąd podczas przyznawania dostępu')
    }
  }

  const handleAddUser = async () => {
    if (!newUserData.firstName || !newUserData.lastName || !newUserData.email || !newUserData.password) {
      toast.error('Wszystkie pola są wymagane')
      return
    }

    if (newUserData.password.length < 6) {
      toast.error('Hasło musi mieć co najmniej 6 znaków')
      return
    }

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserData)
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('Użytkownik utworzony pomyślnie')
        setIsAddUserModalOpen(false)
        setNewUserData({ firstName: '', lastName: '', email: '', password: '' })
        fetchData() // Refresh user list
      } else {
        toast.error(data.error || 'Błąd tworzenia użytkownika')
      }
    } catch (error) {
      toast.error('Wystąpił błąd')
    }
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) {
      toast.error('Nie wybrano użytkownika')
      return
    }

    console.log('Deleting user:', selectedUser.id, selectedUser.email)

    try {
      const res = await fetch(`/api/admin/users?id=${selectedUser.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        console.log('User deleted successfully')
        toast.success('Użytkownik został usunięty!')
        setIsDeleteModalOpen(false)
        setSelectedUser(null)
        await fetchData() // Refresh user list
      } else {
        const data = await res.json().catch(() => ({}))
        console.error('Delete user error:', data)
        toast.error(data.error || 'Błąd usuwania użytkownika')
      }
    } catch (error) {
      console.error('Delete user exception:', error)
      toast.error('Wystąpił błąd podczas usuwania')
    }
  }

  const filteredUsers = users.filter(user => 
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
          <h1 className="text-3xl font-bold text-gray-900">Panel Administratora</h1>
          <p className="text-gray-500">Zarządzanie użytkownikami i dostępami</p>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setIsAddUserModalOpen(true)}
          >
            <Shield className="w-4 h-4" />
            Dodaj użytkownika
          </Button>
          <Link href="/admin/discounts">
            <Button variant="outline" className="gap-2">
              <Gift className="w-4 h-4" />
              Kody Rabatowe
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="outline" className="gap-2">
              <ShoppingCart className="w-4 h-4" />
              Zamówienia
            </Button>
          </Link>
          <Link href="/admin/deleted-users">
            <Button variant="outline" className="gap-2">
              <Trash2 className="w-4 h-4" />
              Historia usuniętych
            </Button>
          </Link>
          <div className="bg-white p-4 rounded-lg shadow-sm border flex gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{users.length}</div>
              <div className="text-xs text-gray-500">Użytkowników</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {users.reduce((acc, user) => acc + user.trainings.length, 0)}
              </div>
              <div className="text-xs text-gray-500">Aktywnych szkoleń (Baza: {trainings.length})</div>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Użytkownicy</CardTitle>
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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Użytkownik</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Dostępne szkolenia</TableHead>
                  <TableHead>Data rejestracji</TableHead>
                  <TableHead className="text-right">Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name || 'Bez nazwy'}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.isAdmin ? (
                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">Admin</Badge>
                      ) : (
                        <Badge variant="secondary">Użytkownik</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.trainings.length > 0 ? (
                          <TooltipProvider>
                            {user.trainings.map((t, i) => (
                              <Tooltip key={i}>
                                <TooltipTrigger>
                                  <Badge variant="outline" className="text-xs cursor-help">
                                    {t.title}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Dostęp od: {new Date(t.grantedAt).toLocaleDateString('pl-PL')}</p>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </TooltipProvider>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString('pl-PL')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedUser(user)
                            setIsAccessModalOpen(true)
                          }}
                          title="Zarządzaj dostępem"
                        >
                          <Shield className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedUser(user)
                            setIsPasswordModalOpen(true)
                          }}
                          title="Zmień hasło"
                        >
                          <Key className="w-4 h-4 text-orange-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedUser(user)
                            setIsDeleteModalOpen(true)
                          }}
                          title="Usuń użytkownika"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Password Reset Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Zmień hasło użytkownika</DialogTitle>
            <DialogDescription>
              Wprowadź nowe hasło dla {selectedUser?.email}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="password"
              placeholder="Nowe hasło"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPasswordModalOpen(false)}>Anuluj</Button>
            <Button onClick={handlePasswordReset}>Zapisz zmiany</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Access Management Modal */}
      <Dialog open={isAccessModalOpen} onOpenChange={setIsAccessModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Zarządzaj dostępem</DialogTitle>
            <DialogDescription>
              Przyznaj dostęp do szkolenia dla {selectedUser?.email}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select onValueChange={setSelectedTrainingId}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz szkolenie" />
              </SelectTrigger>
              <SelectContent>
                {trainings.map((training) => (
                  <SelectItem key={training.id} value={training.id}>
                    {training.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAccessModalOpen(false)}>Anuluj</Button>
            <Button onClick={handleGrantAccess}>Przyznaj dostęp</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Modal */}
      <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dodaj nowego użytkownika</DialogTitle>
            <DialogDescription>
              Utwórz konto dla nowego użytkownika.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Imię</label>
              <Input
                placeholder="Jan"
                value={newUserData.firstName}
                onChange={(e) => setNewUserData({ ...newUserData, firstName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Nazwisko</label>
              <Input
                placeholder="Kowalski"
                value={newUserData.lastName}
                onChange={(e) => setNewUserData({ ...newUserData, lastName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="jan.kowalski@example.com"
                value={newUserData.email}
                onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Hasło</label>
              <Input
                type="password"
                placeholder="Minimum 6 znaków"
                value={newUserData.password}
                onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserModalOpen(false)}>Anuluj</Button>
            <Button onClick={handleAddUser}>Dodaj użytkownika</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Usuń użytkownika</DialogTitle>
            <DialogDescription>
              Czy na pewno chcesz usunąć użytkownika {selectedUser?.email}? Tej operacji nie można cofnąć.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Anuluj</Button>
            <Button variant="destructive" onClick={handleDeleteUser}>Usuń</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
