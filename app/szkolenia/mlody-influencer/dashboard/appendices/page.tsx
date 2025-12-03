'use client';

import { useEffect, useState } from 'react';
import { DashboardNavbar } from '@/components/dashboard/navbar';
import { ContentRenderer } from '@/components/dashboard/content-renderer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';

export default function AppendicesPage() {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch and parse appendices content
    fetch('/content/course.md')
      .then(res => res.text())
      .then(text => {
        const appendixStart = text.indexOf('## Załączniki');
        if (appendixStart !== -1) {
          // Get all content from Załączniki to the end
          setContent(text.substring(appendixStart).trim());
        }
      })
      .catch(err => console.error('Error loading appendices:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-yellow-50">
      <DashboardNavbar />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link href="/dashboard">
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
            <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center shadow-warm">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Załączniki</h1>
              <p className="text-lg text-muted-foreground">Zasoby, szablony i dodatkowe materiały</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-8 rounded-3xl shadow-warm">
            <div className="prose prose-lg max-w-none">
              <ContentRenderer content={content} />
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
