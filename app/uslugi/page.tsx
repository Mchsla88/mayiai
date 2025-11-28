import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function UslugiPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Usługi</h1>
        <p>Zapraszamy do zapoznania się z naszymi usługami.</p>
      </main>
      <Footer />
    </div>
  )
}
