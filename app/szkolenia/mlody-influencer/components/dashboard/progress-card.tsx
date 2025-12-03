'use client';

import { motion } from 'framer-motion';
import { Award, BookOpen, Clock, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

interface ProgressCardProps {
  completedChapters: number;
  totalChapters: number;
  totalTime: number;
  achievementsCount: number;
}

export function ProgressCard({
  completedChapters,
  totalChapters,
  totalTime,
  achievementsCount,
}: ProgressCardProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const progressPercentage = (completedChapters / totalChapters) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [progressPercentage]);

  const stats = [
    {
      icon: BookOpen,
      label: 'Ukończone rozdziały',
      value: `${completedChapters}/${totalChapters}`,
      color: 'text-primary',
    },
    {
      icon: Clock,
      label: 'Czas nauki',
      value: `${totalTime} min`,
      color: 'text-secondary',
    },
    {
      icon: Award,
      label: 'Zdobyte odznaki',
      value: achievementsCount,
      color: 'text-accent',
    },
    {
      icon: TrendingUp,
      label: 'Postęp',
      value: `${Math.round(progressPercentage)}%`,
      color: 'text-primary',
    },
  ];

  return (
    <Card className="p-6 rounded-3xl shadow-warm">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Twój Postęp</h3>
          <p className="text-sm text-muted-foreground">Kontynuuj naukę i zdobywaj nowe umiejętności!</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Ogólny postęp</span>
            <span className="font-bold text-primary">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={animatedProgress} className="h-3" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-4 bg-muted rounded-2xl"
            >
              <div className={`p-2 rounded-xl bg-white shadow-sm`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}
