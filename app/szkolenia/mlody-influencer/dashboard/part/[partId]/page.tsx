'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardNavbar } from '@/components/dashboard/navbar';
import { courseParts, chapters } from '@/lib/course-data-mlody';

export default function PartPage() {
  const params = useParams();
  const router = useRouter();
  const partId = parseInt(params?.partId as string);
  const [slideCounts, setSlideCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const part = courseParts.find(p => p.id === partId);
  const partChapters = chapters.filter(ch => ch.part === partId);

  useEffect(() => {
    // Fetch slide counts from API
    fetch('/api/chapter-slide-counts')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSlideCounts(data.counts);
        }
      })
      .catch(error => console.error('Error fetching slide counts:', error))
      .finally(() => setLoading(false));
  }, []);

  if (!part) {
    return <div>Część nie została znaleziona</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50">
      <DashboardNavbar />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="mb-6 hover:bg-orange-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót do kursu
          </Button>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl">{part.icon}</div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  Część {part.id}: {part.title}
                </h1>
                <p className="text-lg text-gray-600">
                  {partChapters.length} {partChapters.length === 1 ? 'rozdział' : 'rozdziały'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {partChapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-400 bg-white"
                  onClick={() => router.push(`/dashboard/chapter/${chapter.id}`)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{chapter.icon}</div>
                        <div>
                          <CardTitle className="text-xl text-gray-800">
                            Rozdział {index + 1}: {chapter.title}
                          </CardTitle>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-2 text-gray-700">
                      {chapter.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                        <Clock className="h-4 w-4" />
                        {chapter.estimatedTime}
                      </div>
                      <Badge variant="secondary" className="bg-orange-200 text-orange-900 font-semibold">
                        <BookOpen className="mr-1 h-3 w-3" />
                        {loading ? '...' : (slideCounts[chapter.id] || 0)} slajdów
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
