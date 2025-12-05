'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/cart-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Trash2, ArrowRight, ShieldCheck, Clock, Tag, Loader2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function CartPage() {
  const { items, removeItem, total, clearCart } = useCart()
  const { data: session } = useSession()
  const [discountCode, setDiscountCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string
    discount: number
    type: 'PERCENTAGE' | 'FIXED'
  } | null>(null)
  const [isValidatingCode, setIsValidatingCode] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Checkout Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  })
  const [regulationsAccepted, setRegulationsAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (session?.user) {
      setFormData({
        email: session.user.email || '',
        firstName: session.user.firstName || '',
        lastName: session.user.lastName || '',
      })
    }
  }, [session])

  const calculateTotal = () => {
    if (!appliedDiscount) return total
    
    if (appliedDiscount.type === 'PERCENTAGE') {
      return Math.round(total * (1 - appliedDiscount.discount / 100))
    } else {
      return Math.max(0, total - appliedDiscount.discount)
    }
  }

  const handleValidateCode = async () => {
    if (!discountCode) return

    try {
      setIsValidatingCode(true)
      const response = await fetch('/api/discounts/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: discountCode }),
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
      toast.error('Błąd walidacji kodu')
    } finally {
      setIsValidatingCode(false)
    }
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()

    if (items.length === 0) {
      toast.error('Twój koszyk jest pusty')
      return
    }

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
          items: items.map(item => item.id),
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
        setErrorMessage(data.error || 'Wystąpił błąd podczas inicjowania płatności')
        toast.error(data.error || 'Wystąpił błąd')
      }
    } catch (error) {
      setErrorMessage('Wystąpił błąd połączenia. Spróbuj ponownie.')
      toast.error('Wystąpił błąd połączenia')
    } finally {
      setIsProcessing(false)
    }
  }

  const finalPrice = calculateTotal()
  const discountAmount = total - finalPrice

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-20">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
              <Tag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Twój koszyk jest pusty</h1>
            <p className="text-gray-500">Dodaj szkolenia, aby rozpocząć naukę.</p>
            <Link href="/oferta">
              <Button size="lg" className="mt-4">
                Przeglądaj ofertę
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Twój koszyk</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6 divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden">
                        {item.imageUrl ? (
                          <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-purple-100 text-purple-600">
                            <Tag className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            title="Usuń z koszyka"
                            aria-label="Usuń z koszyka"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="text-sm text-gray-500">Dostęp natychmiastowy</div>
                          <div className="font-bold text-lg">{item.price} zł</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dane do zamówienia</CardTitle>
                </CardHeader>
                <CardContent>
                  {errorMessage && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Błąd</AlertTitle>
                      <AlertDescription>
                        {errorMessage}
                      </AlertDescription>
                    </Alert>
                  )}
                  <form onSubmit={handleCheckout} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={isProcessing}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Imię *</Label>
                        <Input
                          id="firstName"
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
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required
                          disabled={isProcessing}
                        />
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t">
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
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-orange-100 bg-orange-50/50">
                <CardContent className="p-4 flex items-center gap-3 text-orange-800">
                  <Clock className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">Nie trać czasu! Ta cena obowiązuje jeszcze tylko przez chwilę.</p>
                </CardContent>
              </Card>

              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Podsumowanie</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Łączna wartość</span>
                      <span>{total} zł</span>
                    </div>
                    {appliedDiscount && (
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Twój rabat ({appliedDiscount.code})</span>
                        <span>-{discountAmount} zł</span>
                      </div>
                    )}
                    <div className="pt-4 border-t flex justify-between items-end">
                      <span className="font-semibold text-lg">Razem do zapłaty</span>
                      <div className="text-right">
                        {appliedDiscount && (
                          <div className="text-sm text-gray-400 line-through">{total} zł</div>
                        )}
                        <div className="text-3xl font-bold text-gray-900">{finalPrice} zł</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-gray-600">Kod rabatowy (Opcjonalnie)</Label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Twój kupon" 
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        disabled={!!appliedDiscount}
                      />
                      {appliedDiscount ? (
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setAppliedDiscount(null)
                            setDiscountCode('')
                          }}
                          className="text-red-500"
                        >
                          Usuń
                        </Button>
                      ) : (
                        <Button 
                          variant="secondary"
                          onClick={handleValidateCode}
                          disabled={!discountCode || isValidatingCode}
                          className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                        >
                          {isValidatingCode ? <Loader2 className="w-4 h-4 animate-spin" /> : 'AKTYWUJ'}
                        </Button>
                      )}
                    </div>
                  </div>

                  <Button 
                    className="w-full h-12 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-200"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Przetwarzanie...
                      </>
                    ) : (
                      'Zamawiam i płacę'
                    )}
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Bezpieczne płatności PayU</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
