
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { loginToStudio } from './auth'
import { toast } from 'react-hot-toast'
import { Lock } from 'lucide-react'

export function StudioLogin() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    try {
        const result = await loginToStudio(formData)
        // If we get here and there's an error, show it.
        // If redirect happens server-side, this code might not run or promise resolves??
        // Actually, redirect throws error in Next.js which is caught by the framework.
        if (result?.error) {
             setLoading(false)
             toast.error(result.error)
        }
    } catch (e: any) {
        // NEXT_REDIRECT error is thrown on successful redirect, we should ignore it? 
        // Or if it's a real error.
        // Usually server actions redirect doesn't throw on client?
        // Let's safe guard.
        setLoading(false)
        console.error(e)
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Content Studio</CardTitle>
          <CardDescription>
            Strefa prywatna. Podaj hasło dostępu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <Input 
              name="password" 
              type="password" 
              placeholder="Hasło..." 
              required 
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Weryfikacja...' : 'Wejdź'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
