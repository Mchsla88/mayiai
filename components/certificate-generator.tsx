'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Award, Printer } from 'lucide-react'

export function CertificateGenerator() {
  const [name, setName] = useState('')

  const handlePrint = () => {
    if (!name) return
    window.print()
  }

  return (
    <div className="space-y-8">
      <div className="no-print bg-white p-6 rounded-xl border-2 border-purple-100 shadow-sm mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Wygeneruj Swój Certyfikat</h3>
        <p className="text-gray-600 mb-4">
          Wpisz swoje imię i nazwisko poniżej, aby spersonalizować certyfikat. Następnie kliknij "Drukuj / Zapisz PDF".
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Wpisz swoje imię i nazwisko"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="max-w-md"
          />
          <Button onClick={handlePrint} disabled={!name} className="bg-purple-600 hover:bg-purple-700">
            <Printer className="w-4 h-4 mr-2" />
            Drukuj / Zapisz PDF
          </Button>
        </div>
      </div>

      {/* Certificate Preview (Visible) */}
      <div id="certificate-view" className="relative bg-white text-center p-10 border-[20px] border-double border-purple-200 shadow-2xl max-w-[800px] mx-auto aspect-[1.414/1] flex flex-col">
        <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-purple-500 pointer-events-none" />
        <div className="absolute top-6 left-6 right-6 bottom-6 border border-purple-300 pointer-events-none" />
        
        <div className="h-full flex flex-col items-center justify-center space-y-6 z-10 py-8">
          <Award className="w-24 h-24 text-purple-600" />
          
          <h1 className="text-5xl font-serif text-purple-900 font-bold tracking-wider">CERTYFIKAT</h1>
          <p className="text-xl text-gray-500 uppercase tracking-widest font-medium">Ukończenia Szkolenia</p>
          
          <div className="py-8 w-full">
            <p className="text-gray-600 mb-2 italic">Niniejszym zaświadcza się, że</p>
            <h2 className="text-4xl font-bold text-gray-900 font-serif border-b-2 border-gray-300 pb-4 mx-12 min-h-[60px]">
              {name || "Imię i Nazwisko"}
            </h2>
          </div>
          
          <div className="space-y-3">
            <p className="text-xl text-gray-700">ukończył(a) kurs:</p>
            <h3 className="text-3xl font-bold text-purple-700">
              "AI w Edukacji: Od Obaw do Praktyki"
            </h3>
            <p className="text-gray-600 max-w-lg mx-auto">
              Zakres: Prompt Engineering (Model R.O.L.A.), Etyka AI, Tworzenie Scenariuszy Lekcji, Narzędzia AI dla Nauczycieli
            </p>
          </div>

          <div className="flex justify-between w-full px-16 pt-16 mt-auto">
            <div className="text-center">
              <p className="font-bold text-gray-900 text-lg">{new Date().toLocaleDateString('pl-PL')}</p>
              <div className="h-px w-40 bg-gray-400 mt-2" />
              <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide">Data</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-purple-900 font-serif italic text-lg">May I AI Team</p>
              <div className="h-px w-40 bg-gray-400 mt-2" />
              <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide">Organizator</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0;
          }
          body * {
            visibility: hidden;
          }
          #certificate-view, #certificate-view * {
            visibility: visible;
          }
          #certificate-view {
            position: fixed;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            margin: 0;
            border: none;
            box-shadow: none;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: scale(1); /* Adjust if needed */
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
