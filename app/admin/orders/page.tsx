'use client'

import Link from 'next/link'
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from '@/components/ui/badge'
import { Search, ChevronLeft, Loader2, FileText, ShoppingCart } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Order {
  id: string
  payuOrderId: string
  amount: string | number
  currency: string
  status: string
  description: string
  customerEmail: string
  createdAt: string
  invoiceData: any
  user: {
    name: string | null
    email: string
  } | null
  training: {
    title: string
  } | null
}

export default function AdminOrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/admin/orders')
      return
    }

    if (session && !session.user?.isAdmin && session.user?.email !== 'michal@mayiai.pl') {
      router.push('/admin') // Redirect to main admin page which handles access denied
      return
    }

    fetchOrders()
  }, [status, session, router])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setOrders(data)
      } else {
        toast.error('Błąd pobierania zamówień')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Błąd połączenia')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredOrders = orders.filter(order => 
    order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.payuOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.user?.name && order.user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Opłacone</Badge>
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Oczekujące</Badge>
      case 'CANCELED':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Anulowane</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN'
    }).format(Number(amount))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Link href="/admin" className="hover:text-gray-900 transition-colors flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" />
              Panel Administratora
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Zamówienia</h1>
          <p className="text-gray-500">Przegląd wszystkich transakcji i faktur</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lista zamówień ({filteredOrders.length})</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Szukaj (email, ID, nazwa)..."
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
                <TableHead>ID Zamówienia (PayU)</TableHead>
                <TableHead>Klient</TableHead>
                <TableHead>Kwota</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Faktura</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">{order.payuOrderId}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.user?.name || 'Gość'}</div>
                      <div className="text-sm text-gray-500">{order.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">
                    {formatCurrency(order.amount)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(order.status)}
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString('pl-PL')}
                    <div className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleTimeString('pl-PL')}
                    </div>
                  </TableCell>
                  <TableCell>
                    {order.invoiceData ? (
                      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                        Tak
                        {order.invoiceData.type === 'company' && ' (Firma)'}
                      </Badge>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedOrder(order)
                        setIsDetailsModalOpen(true)
                      }}
                    >
                      Szczegóły
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Szczegóły zamówienia</DialogTitle>
            <DialogDescription>
              ID: {selectedOrder?.payuOrderId}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-1">Status</h4>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-1">Kwota</h4>
                  <div className="text-xl font-bold">{formatCurrency(selectedOrder.amount)}</div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-1">Data utworzenia</h4>
                  <div>{new Date(selectedOrder.createdAt).toLocaleString('pl-PL')}</div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-1">Opis</h4>
                  <div>{selectedOrder.description}</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-2">Dane klienta</h4>
                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                  <div className="font-medium">{selectedOrder.user?.name}</div>
                  <div>{selectedOrder.customerEmail}</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Dane do faktury
                </h4>
                {selectedOrder.invoiceData ? (
                  <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-lg space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <div>
                        <span className="text-gray-500">Typ:</span>{' '}
                        <span className="font-medium">
                          {selectedOrder.invoiceData.type === 'company' ? 'Firma' : 'Osoba prywatna'}
                        </span>
                      </div>
                      {selectedOrder.invoiceData.nip && (
                        <div>
                          <span className="text-gray-500">NIP:</span>{' '}
                          <span className="font-medium">{selectedOrder.invoiceData.nip}</span>
                        </div>
                      )}
                      <div className="col-span-2">
                        <span className="text-gray-500">Nazwa/Imię i nazwisko:</span>{' '}
                        <div className="font-medium">
                          {selectedOrder.invoiceData.type === 'company' 
                            ? selectedOrder.invoiceData.companyName 
                            : `${selectedOrder.invoiceData.firstName} ${selectedOrder.invoiceData.lastName}`}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500">Adres:</span>{' '}
                        <div className="font-medium">
                          {selectedOrder.invoiceData.address}<br />
                          {selectedOrder.invoiceData.postalCode} {selectedOrder.invoiceData.city}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 italic text-sm">Brak danych do faktury</div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
