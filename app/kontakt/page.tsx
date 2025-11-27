import { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Skontaktuj się z nami! Odpowiadamy na pytania o edukację AI dla dzieci i rodzin. Pomożemy wybrać najlepszą opcję dla Twojej rodziny.',
  openGraph: {
    title: 'Kontakt | May I AI Family Expert',
    description: 'Masz pytania o edukację AI? Skontaktuj się z naszym zespołem ekspertów. Odpowiadamy w 24h!',
    url: 'https://mayiai.pl/kontakt',
  },
}

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

        {/* Contact Info & Form */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Dane Kontaktowe</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Odpowiadamy na wszystkie wiadomości w ciągu 24 godzin. 
                    Wybierz preferowany sposób kontaktu.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      title: 'Email',
                      content: 'kontakt@aifamilyexpert.pl',
                      description: 'Odpowiadamy w ciągu 24h',
                      color: 'from-blue-500 to-cyan-500',
                      href: 'mailto:kontakt@aifamilyexpert.pl'
                    },
                    {
                      icon: Phone,
                      title: 'Telefon',
                      content: '+48 123 456 789',
                      description: 'Pon-Pt: 9:00 - 17:00',
                      color: 'from-green-500 to-emerald-500',
                      href: 'tel:+48123456789'
                    },
                    {
                      icon: MapPin,
                      title: 'Adres',
                      content: 'ul. Przykładowa 123',
                      description: '00-001 Warszawa, Polska',
                      color: 'from-purple-500 to-pink-500',
                      href: '#'
                    },
                    {
                      icon: Clock,
                      title: 'Godziny Otwarcia',
                      content: 'Poniedziałek - Piątek',
                      description: '9:00 - 17:00',
                      color: 'from-orange-500 to-red-500',
                      href: '#'
                    }
                  ].map((item, i) => (
                    <Card key={i} className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                      <CardContent className="p-6">
                        <a href={item.href} className="flex items-start gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform shadow-lg`}>
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                            <p className="text-gray-800 font-medium">{item.content}</p>
                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                          </div>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="relative w-full aspect-square max-w-sm">
                  <Image
                    src="/dog-mascot-office.png"
                    alt="AI Family Expert - Skontaktuj się"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="border-2 border-blue-100 shadow-xl">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <MessageSquare className="w-12 h-12 text-blue-600 mb-4" />
                      <h2 className="text-3xl font-bold mb-2">Wyślij Wiadomość</h2>
                      <p className="text-gray-600">
                        Wypełnij formularz, a nasz zespół skontaktuje się z Tobą najszybciej jak to możliwe.
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
                          Telefon
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="+48 123 456 789"
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
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Najczęściej Zadawane Pytania</h2>
                <p className="text-xl text-gray-600">
                  Szybkie odpowiedzi na najpopularniejsze pytania
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    question: 'Jak szybko otrzymam odpowiedź?',
                    answer: 'Odpowiadamy na wszystkie wiadomości w ciągu 24 godzin roboczych. W pilnych sprawach możesz skontaktować się z nami telefonicznie.'
                  },
                  {
                    question: 'Czy mogę umówić się na konsultację online?',
                    answer: 'Tak! Oferujemy bezpłatne 30-minutowe konsultacje online. Skontaktuj się z nami, aby umówić termin.'
                  },
                  {
                    question: 'Czy oferujecie wsparcie techniczne?',
                    answer: 'Tak, nasz zespół wsparcia technicznego jest dostępny od poniedziałku do piątku w godzinach 9:00-17:00.'
                  },
                  {
                    question: 'Czy mogę zwrócić ebooka?',
                    answer: 'Oferujemy 30-dniową gwarancję zwrotu pieniędzy, jeśli nie jesteś zadowolony z naszych materiałów.'
                  }
                ].map((faq, i) => (
                  <Card key={i} className="border-2 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
