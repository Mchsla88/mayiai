'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { DashboardNavbar } from '@/components/dashboard/navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Palette, Star } from 'lucide-react';
import { projects } from '@/lib/course-data-mlody';

export default function ProjectsPage() {
  const router = useRouter();

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'beginner':
        return 'Początkujący';
      case 'educational':
        return 'Edukacyjny';
      case 'creative':
        return 'Kreatywny';
      case 'scientific':
        return 'Naukowy';
      case 'social':
        return 'Społeczny';
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'beginner':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'educational':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'creative':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'scientific':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'social':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-yellow-50">
      <DashboardNavbar />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="rounded-2xl gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Powrót do kursu
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center shadow-warm">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">50+ Projektów</h1>
              <p className="text-lg text-muted-foreground">
                Praktyczne projekty do realizacji
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects?.map((project, index) => (
            <motion.div
              key={project?.id || `project-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Card className="p-6 rounded-3xl shadow-warm hover:shadow-warm-lg transition-smooth">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-warm rounded-2xl flex items-center justify-center text-2xl shadow-warm">
                    {project?.icon || '🎨'}
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={getCategoryColor(project?.category || 'beginner')}>
                      {getCategoryLabel(project?.category || 'beginner')}
                    </Badge>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">
                  {project?.title || 'Projekt'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {project?.description || ''}
                </p>

                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(project?.difficulty || 1)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  {[...Array(3 - (project?.difficulty || 1))].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gray-300" />
                  ))}
                  <span className="ml-2 text-xs text-muted-foreground">
                    Poziom {project?.difficulty || 1}/3
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Card className="p-8 rounded-3xl shadow-warm bg-gradient-to-r from-orange-100 to-blue-100">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Chcesz zobaczyć więcej projektów?
            </h3>
            <p className="text-muted-foreground mb-4">
              Pełna lista 50+ projektów dostępna jest w Rozdziale 21
            </p>
            <Button
              onClick={() => router.push('/dashboard/chapter/chapter-21')}
              className="rounded-2xl bg-gradient-warm text-white shadow-warm hover:shadow-warm-lg transition-smooth"
            >
              Przejdź do pełnej listy
            </Button>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
