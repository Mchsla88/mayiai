'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, Unlock, Eye, EyeOff, Loader2 } from 'lucide-react'

interface SimpleLoginFormProps {
  onLogin: () => void
  title?: string
}

export function SimpleLoginForm({ onLogin, title = "Dostęp do Szkolenia" }: SimpleLoginFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Debug: Log props to see what's being passed
  console.log("SimpleLoginForm rendered with props:", { onLogin, title })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    console.log("Próba logowania:", username, password)

    if (username.trim() === 'test' && password.trim() === 'test') {
      console.log("Logowanie udane!")
      try {
        if (typeof onLogin === 'function') {
          onLogin()
          // If the component doesn't unmount immediately, stop loading after a short delay
          setTimeout(() => setIsLoading(false), 2000)
        } else {
          console.error("CRITICAL ERROR: onLogin prop is not a function!", onLogin)
          setError('Błąd konfiguracji: Brak funkcji logowania. Skontaktuj się z administratorem.')
          setIsLoading(false)
        }
      } catch (err) {
        console.error("Login callback error:", err)
        setError('Wystąpił błąd podczas logowania. Spróbuj odświeżyć stronę.')
        setIsLoading(false)
      }
    } else {
      console.log("Błąd logowania")
      setError('Nieprawidłowy login lub hasło (spróbuj: test / test)')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl bg-white">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {title}
            </h2>
            <p className="text-gray-600 mt-2">
              Zaloguj się, aby uzyskać dostęp
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-gray-700 font-medium">
                Login
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Wprowadź login"
                className="mt-2 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-black"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Hasło
              </Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Wprowadź hasło"
                  className="h-12 pr-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-black"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-2"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white text-lg font-medium shadow-lg transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Logowanie...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Unlock className="w-5 h-5" />
                  Zaloguj się
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
