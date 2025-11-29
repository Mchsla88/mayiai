'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Send,
  MessageSquare,
  Sparkles
} from 'lucide-react'

export default function KontaktPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Jesteśmy tu dla Ciebie
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Skontaktuj Się
                </span>
                <br />
                <span className="text-gray-800">z Nami</span>
              </h1>
              
              <p className="text-xl text-gray-600">
                Masz pytania? Potrzebujesz pomocy? Nasz zespół ekspertów jest gotowy, 
                by Ci pomóc w bezpiecznej nauce AI dla Twojej rodziny.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Only */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="border-2 border-blue-100 shadow-xl">
                <CardContent className="p-8 md:p-12">
                  <div className="mb-8 text-center">
                    <MessageSquare className="w-16 h-16 text-blue-600 mb-4 mx-auto" />
                    <h2 className="text-3xl font-bold mb-2">Wyślij Wiadomość</h2>
                    <p className="text-gray-600">
                      Wypełnij formularz, a odpiszemy na adres <strong>hello@mayiai.pl</strong> najszybciej jak to możliwe.
                    </p>
                  </div>

                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Imię *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Jan"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nazwisko *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Kowalski"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="jan.kowalski@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Temat *
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Wybierz temat...</option>
                        <option value="ebook">Pytanie o ebooka</option>
                        <option value="szkolenie">Pytanie o szkolenia</option>
                        <option value="wspolpraca">Współpraca</option>
                        <option value="inne">Inne</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Wiadomość *
                      </label>
                      <textarea
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="Wpisz swoją wiadomość..."
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="privacy"
                        required
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="privacy" className="text-sm text-gray-600">
                        Zgadzam się z <a href="/polityka-prywatnosci" className="text-blue-600 hover:underline">polityką prywatności</a> i wyrażam zgodę na przetwarzanie moich danych osobowych.
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg group"
                    >
                      Wyślij Wiadomość
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
