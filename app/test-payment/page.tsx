'use client';

import { PayButton } from '@/components/payu/PayButton';

export default function TestPaymentPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Test Płatności PayU</h1>
          <p className="mt-2 text-gray-600">
            To jest strona testowa do weryfikacji integracji z PayU.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-blue-900 mb-2">Szczegóły zamówienia:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>Produkt: Testowa usługa</li>
              <li>Kwota: 1.00 PLN</li>
              <li>Klient: jan.kowalski@example.com</li>
            </ul>
          </div>

          <PayButton 
            amount={1.00} 
            description="Testowa płatność PayU" 
            buyer={{ 
              email: 'jan.kowalski@example.com',
              firstName: 'Jan',
              lastName: 'Kowalski'
            }}
            className="w-full text-lg py-6"
          >
            Zapłać 1.00 PLN przez PayU
          </PayButton>

          <p className="text-xs text-center text-gray-500">
            Upewnij się, że uzupełniłeś plik .env danymi z PayU Sandbox przed kliknięciem.
          </p>
        </div>
      </div>
    </div>
  );
}
