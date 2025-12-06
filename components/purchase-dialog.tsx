import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { Loader2, Tag, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface PurchaseDialogProps {
  isOpen: boolean
  onClose: () => void
  trainingId: string
  trainingTitle: string
  trainingPrice: number
}

interface DiscountData {
  code: string
  discount: number
  type: 'PERCENTAGE' | 'FIXED'
}

export function PurchaseDialog({
  isOpen,
  onClose,
  trainingId,
  trainingTitle,
  trainingPrice,
}: PurchaseDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isValidatingCode, setIsValidatingCode] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  })
  const [discountCode, setDiscountCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountData | null>(null)
  const [regulationsAccepted, setRegulationsAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      setDiscountCode('')
      setAppliedDiscount(null)
      setRegulationsAccepted(false)
      setPrivacyAccepted(false)
      setErrorMessage(null)
    }
  }, [isOpen])

  const calculateFinalPrice = () => {
    if (!appliedDiscount) return trainingPrice
    
    if (appliedDiscount.type === 'PERCENTAGE') {
      return Math.round(trainingPrice * (1 - appliedDiscount.discount / 100))
    } else {
      return Math.max(0, trainingPrice - appliedDiscount.discount)
    }
  }

  const handleValidateCode = async () => {
    if (!discountCode) return

    try {
      setIsValidatingCode(true)
      setErrorMessage(null)
      const response = await fetch('/api/discounts/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: discountCode, trainingId }),
      })

      const data = await response.json()

      if (response.ok) {
        setAppliedDiscount(data)
        toast.success('Kod rabatowy został zastosowany!')
      } else {
        setAppliedDiscount(null)
        toast.error(data.error || 'Nieprawidłowy kod rabatowy')
      }
    } catch (error) {
      console.error('Validation error:', error)
      toast.error('Błąd walidacji kodu')
    } finally {
      setIsValidatingCode(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!formData.email || !formData.firstName || !formData.lastName) {
      toast.error('Wypełnij wszystkie wymagane pola')
      return
    }

    if (!regulationsAccepted || !privacyAccepted) {
      toast.error('Musisz zaakceptować regulamin i politykę prywatności')
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
          discountCode: appliedDiscount?.code,
        }),
      })

      const data = await response.json()

      if (response.ok && data.redirectUri) {
        toast.success('Przekierowywanie do płatności...')
        window.location.href = data.redirectUri
      } else {
        // Show error in the dialog
        setErrorMessage(data.error || 'Wystąpił błąd podczas inicjowania płatności')
        // Also show toast for visibility
        toast.error(data.error || 'Wystąpił błąd')
        console.error('PayU error:', data)
      }
    } catch (error) {
      console.error('Purchase error:', error)
      setErrorMessage('Wystąpił błąd połączenia. Spróbuj ponownie.')
      toast.error('Wystąpił błąd połączenia')
    } finally {
      setIsProcessing(false)
    }
  }

  const finalPrice = calculateFinalPrice()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Zakup szkolenia</DialogTitle>
          <DialogDescription>
            Uzupełnij dane, aby sfinalizować zamówienie.
          </DialogDescription>
        </DialogHeader>
        
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Błąd</AlertTitle>
            <AlertDescription>
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="font-medium text-gray-900">{trainingTitle}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-500">Cena:</span>
            <div className="text-right">
              {appliedDiscount ? (
                <>
                  <span className="text-sm text-gray-400 line-through mr-2">{trainingPrice} PLN</span>
                  <span className="font-bold text-green-600">{finalPrice} PLN</span>
                </>
              ) : (
                <span className="font-bold text-gray-900">{trainingPrice} PLN</span>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="twoj@email.pl"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
                setErrorMessage(null)
              }}
              required
              disabled={isProcessing}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="discountCode">Kod rabatowy</Label>
            <div className="flex gap-2">
              <Input
                id="discountCode"
                placeholder="Wpisz kod"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                disabled={isProcessing || !!appliedDiscount}
              />
              {appliedDiscount ? (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setAppliedDiscount(null)
                    setDiscountCode('')
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  Usuń
                </Button>
              ) : (
                <Button 
                  type="button" 
                  variant="secondary"
                  onClick={handleValidateCode}
                  disabled={!discountCode || isValidatingCode || isProcessing}
                >
                  {isValidatingCode ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Zastosuj'}
                </Button>
              )}
            </div>
            {appliedDiscount && (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                Kod zastosowany: -{appliedDiscount.type === 'PERCENTAGE' ? `${appliedDiscount.discount}%` : `${appliedDiscount.discount} PLN`}
              </p>
            )}
          </div>

          <div className="space-y-3 pt-2 border-t">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="regulations" 
                checked={regulationsAccepted}
                onCheckedChange={(checked) => setRegulationsAccepted(checked as boolean)}
              />
              <Label htmlFor="regulations" className="text-sm leading-tight font-normal text-gray-600">
                Akceptuję <Link href="/documents/regulamin_zakupow_mayiai.pdf" target="_blank" className="text-blue-600 hover:underline">Regulamin Zakupów</Link> oraz <Link href="/documents/regulamin_zwrotow_mayiai.pdf" target="_blank" className="text-blue-600 hover:underline">Politykę Zwrotów</Link> *
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="privacy" 
                checked={privacyAccepted}
                onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
              />
              <Label htmlFor="privacy" className="text-sm leading-tight font-normal text-gray-600">
                Zapoznałem/am się z <Link href="/polityka-prywatnosci" target="_blank" className="text-blue-600 hover:underline">Polityką Prywatności</Link> i akceptuję jej postanowienia *
              </Label>
            </div>
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
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 font-bold"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Przetwarzanie...
                </>
              ) : (
                'Zamawiam i płacę'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
