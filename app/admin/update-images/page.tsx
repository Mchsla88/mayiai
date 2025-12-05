'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function UpdateImagesPage() {
  const [secret, setSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleUpdate = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/admin/update-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret })
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Błąd podczas aktualizacji' })
    } finally {
      setLoading(false)
    }
  }

  const handleCheck = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/update-images')
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Błąd podczas pobierania' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Aktualizacja Zdjęć Szkoleń</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Hasło Admin (ADMIN_SECRET):
              </label>
              <Input
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Wprowadź hasło..."
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleUpdate} 
                disabled={loading || !secret}
                className="w-full"
              >
                {loading ? 'Aktualizuję...' : 'Zaktualizuj Zdjęcia'}
              </Button>

              <Button 
                onClick={handleCheck} 
                disabled={loading}
                variant="outline"
              >
                Sprawdź Aktualne
              </Button>
            </div>

            {result && (
              <Card className="mt-4">
                <CardContent className="pt-6">
                  <pre className="text-xs overflow-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
