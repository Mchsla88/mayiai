'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface PurchaseDialogProps {
  isOpen: boolean
  onClose: () => void
  trainingId: string
  trainingTitle: string
  trainingPrice: number
}

export function PurchaseDialog({
  isOpen,
  onClose,
  trainingId,
  trainingTitle,
  trainingPrice,
}: PurchaseDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.firstName || !formData.lastName) {
      toast.error('Wypełnij wszystkie pola')
      return
    }

    try {
      setIsProcessing(true)
      const response = await fetch('/api/payu/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trainingId,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      })

      const data = await response.json()

      if (response.ok && data.redirectUri) {
        toast.success('Przekierowywanie do płatności...')
        window.location.href = data.redirectUri
      } else {
        toast.error(data.error || 'Wystąpił błąd podczas inicjowania płatności')
        console.error('PayU error:', data)
      }
    } catch (error) {
      console.error('Purchase error:', error)
      toast.error('Wystąpił błąd połączenia')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Zakup szkolenia</DialogTitle>
          <DialogDescription>
            {trainingTitle} - {trainingPrice} PLN
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="twoj@email.pl"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isProcessing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="firstName">Imię *</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Jan"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              disabled={isProcessing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Nazwisko *</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Kowalski"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              disabled={isProcessing}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1"
            >
              Anuluj
            </Button>
            <Button
              type="submit"
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Przetwarzanie...
                </>
              ) : (
                'Przejdź do płatności'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
