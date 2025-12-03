'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
        toast.success('Jeśli konto istnieje, nowe hasło zostanie wysłane na email')
      } else {
        toast.error(data.error || 'Wystąpił błąd')
      }
    } catch (error) {
      toast.error('Wystąpił błąd podczas resetowania hasła')
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="text-6xl">
                ✉️
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl">Sprawdź swój email</CardTitle>
              <CardDescription>Jeśli konto istnieje, nowe hasło zostało wysłane na podany adres email.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 text-center">
                Jeśli nie otrzymasz emaila w ciągu kilku minut, sprawdź folder spam lub spróbuj ponownie.
              </p>
              <Button asChild className="w-full">
                <Link href="/auth/login">Wróć do logowania</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="text-6xl">
              🔑
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl">Resetowanie hasła</CardTitle>
            <CardDescription>Podaj swój adres email, a wyślemy Ci nowe hasło</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="twoj@email.com"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Wysyłanie...' : 'Wyślij nowe hasło'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              ← Wróć do logowania
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
