import React from 'react'

export default function RegulaminZwrotowPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Regulamin Zwrotów</h1>
      <div className="w-full h-[800px] border border-gray-200 rounded-lg shadow-sm">
        <iframe 
          src="/documents/regulamin_zwrotow_mayiai.pdf" 
          className="w-full h-full"
          title="Regulamin Zwrotów"
        />
      </div>
      <div className="mt-4 text-center">
        <a 
          href="/documents/regulamin_zwrotow_mayiai.pdf" 
          download
          className="text-blue-600 hover:underline"
        >
          Pobierz Regulamin Zwrotów (PDF)
        </a>
      </div>
    </div>
  )
}
