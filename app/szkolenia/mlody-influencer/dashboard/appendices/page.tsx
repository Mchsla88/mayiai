'use client';

import { DashboardNavbar } from '@/components/dashboard/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Download, FileCheck } from 'lucide-react';
import Link from 'next/link';

const attachments = [
  {
    id: 1,
    title: 'Kompletny kurs Młody Influencer (PDF)',
    description: 'Pełna wersja kursu do pobrania i druku',
    filename: 'mlody_influencer_kurs_COMPLETE.pdf',
    size: '2.5 MB',
    icon: FileText
  },
  {
    id: 2,
    title: 'Schemat tworzenia treści',
    description: 'Szablon do planowania postów i filmów',
    filename: 'schamat.pdf',
    size: '150 KB',
    icon: FileCheck
  }
];

export default function AppendicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-yellow-50">
      <DashboardNavbar />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link href="/szkolenia/mlody-influencer/dashboard">
            <Button variant="ghost" className="rounded-2xl gap-2">
              <ArrowLeft className="w-4 h-4" />
              Powrót do kursu
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Załączniki</h1>
              <p className="text-lg text-muted-foreground">Materiały do pobrania</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {attachments.map((attachment, index) => {
            const IconComponent = attachment.icon;
            return (
              <motion.div
                key={attachment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-7 h-7 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{attachment.title}</h3>
                        <p className="text-sm text-gray-600">{attachment.description}</p>
                        <p className="text-xs text-gray-400 mt-1">Rozmiar: {attachment.size}</p>
                      </div>
                    </div>
                    <a 
                      href={`/content/${attachment.filename}`} 
                      download
                      className="flex-shrink-0"
                    >
                      <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white gap-2 rounded-xl shadow-md hover:shadow-lg transition-all">
                        <Download className="w-4 h-4" />
                        Pobierz
                      </Button>
                    </a>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl"
        >
          <p className="text-center text-gray-600">
            💡 <strong>Wskazówka:</strong> Pobrane materiały możesz wydrukować lub zapisać na telefonie, aby mieć do nich dostęp offline!
          </p>
        </motion.div>
      </main>
    </div>
  );
}
