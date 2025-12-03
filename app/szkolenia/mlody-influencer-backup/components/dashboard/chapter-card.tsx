'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, Lock } from 'lucide-react';
import { Chapter } from '@/lib/course-data';

interface ChapterCardProps {
  chapter: Chapter;
  index: number;
  isCompleted: boolean;
  isLocked: boolean;
  progress: number;
}

export function ChapterCard({ chapter, index, isCompleted, isLocked, progress }: ChapterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Link href={isLocked ? '#' : `/dashboard/chapter/${chapter.id}`}>
        <Card
          className={`p-6 rounded-3xl shadow-warm hover:shadow-warm-lg transition-smooth relative overflow-hidden ${
            isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 opacity-5 ${
            index % 3 === 0 ? 'bg-gradient-warm' : index % 3 === 1 ? 'bg-gradient-blue' : 'bg-gradient-brown'
          }`} />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-warm ${
                  isCompleted ? 'bg-gradient-warm' : 'bg-white'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  ) : isLocked ? (
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  ) : (
                    <span>{chapter.icon}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Rozdział {index + 1}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {chapter.estimatedTime}
                  </p>
                </div>
              </div>

              {isCompleted && (
                <Badge className="bg-gradient-warm text-white border-0">
                  Ukończone
                </Badge>
              )}

              {isLocked && (
                <Badge variant="secondary">
                  Zablokowane
                </Badge>
              )}
            </div>

            <h4 className="text-lg font-bold text-foreground mb-2">{chapter.title}</h4>
            <p className="text-sm text-muted-foreground mb-4">{chapter.description}</p>

            {!isCompleted && !isLocked && progress > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Postęp</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-warm"
                  />
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{chapter.sections.length} sekcji</span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
