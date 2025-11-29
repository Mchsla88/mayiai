'use client'

import { useState, useEffect } from 'react'
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
import { Search, Shield, Key, Ban, CheckCircle, XCircle, Loader2, Gift } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface User {
  id: string
  name: string | null
  email: string
  role: string
  isAdmin: boolean
  createdAt: string
  trainings: string[]
}

interface Training {
  id: string
  title: string
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [trainings, setTrainings] = useState<Training[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  
  // Modal states
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [selectedTrainingId, setSelectedTrainingId] = useState<string>('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [usersRes, trainingsRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/trainings')
      ])
      
      if (usersRes.ok && trainingsRes.ok) {
        const usersData = await usersRes.json()
        const trainingsData = await trainingsRes.json()
        setUsers(usersData)
        setTrainings(trainingsData)
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
    if (!selectedUser || !selectedTrainingId) return

    try {
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
        toast.success('Przyznano dostęp')
        setIsAccessModalOpen(false)
        fetchData() // Refresh data
      } else {
        toast.error('Błąd przyznawania dostępu')
      }
    } catch (error) {
      toast.error('Wystąpił błąd')
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
           <Button variant="outline" className="gap-2">
            <Gift className="w-4 h-4" />
            Kody Rabatowe
          </Button>
          <div className="bg-white p-4 rounded-lg shadow-sm border flex gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{users.length}</div>
              <div className="text-xs text-gray-500">Użytkowników</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {users.reduce((acc, user) => acc + user.trainings.length, 0)}
              </div>
              <div className="text-xs text-gray-500">Aktywnych szkoleń</div>
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
                        user.trainings.map((t, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {t}
                          </Badge>
                        ))
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
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
    </div>
  )
}
