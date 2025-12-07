'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false, // Don't auto-redirect, handle manually
      })

      if (result?.error) {
        toast.error('Nieprawidłowy email lub hasło')
        setIsLoading(false)
        return
      }

      if (result?.ok) {
        // Check for callbackUrl in query params
        const urlParams = new URLSearchParams(window.location.search)
        const callbackUrl = urlParams.get('callbackUrl') || '/dashboard'
        
        toast.success('Zalogowano pomyślnie!')
        router.refresh()
        router.push(callbackUrl)
      }
    } catch (error) {
      toast.error('Wystąpił błąd podczas logowania')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Decorative Side */}
      <div className="hidden lg:block relative bg-slate-900">
        <Image
          src="/login-hero.png"
          alt="Future of Education"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Witaj w przyszłości<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Twojej Edukacji
            </span>
          </h2>
          <p className="text-lg text-slate-300">
            Zaloguj się, aby uzyskać dostęp do świata wiedzy wspieranego przez Sztuczną Inteligencję.
          </p>
        </div>
      </div>

      {/* Login Form Side */}
      <div className="flex items-center justify-center p-8 bg-gradient-to-br from-white via-purple-50 to-blue-50">
        <Card className="w-full max-w-md border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
          <CardHeader className="text-center space-y-2 pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
              <span className="text-3xl">🤖</span>
            </div>
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              Witaj ponownie
            </CardTitle>
            <CardDescription className="text-base text-slate-500">
              Wpisz swoje dane, aby kontynuować
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                    placeholder="twoj@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                    Hasło
                  </label>
                  <Link 
                    href="/auth/forgot-password" 
                    className="text-xs text-purple-600 hover:text-purple-700 font-medium hover:underline"
                  >
                    Zapomniałeś hasła?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full py-6 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-200 transition-all hover:scale-[1.02] rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Logowanie...</span>
                  </div>
                ) : (
                  'Zaloguj się'
                )}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/80 px-2 text-slate-400 font-medium backdrop-blur-xl">
                  lub
                </span>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-slate-600">
                Nie masz jeszcze konta?{' '}
                <Link 
                  href="/auth/register" 
                  className="text-purple-600 hover:text-purple-700 font-bold hover:underline"
                >
                  Załóż darmowe konto
                </Link>
              </p>
              
              <Link 
                href="/" 
                className="inline-flex items-center text-sm text-slate-400 hover:text-slate-600 transition-colors mt-4"
              >
                ← Wróć do strony głównej
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
