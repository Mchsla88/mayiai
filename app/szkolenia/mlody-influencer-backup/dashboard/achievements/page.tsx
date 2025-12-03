'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { DashboardNavbar } from '@/components/dashboard/navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Lock, Sparkles } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement: number;
}

interface UnlockedAchievement {
  achievementId: string;
  unlockedAt: string;
}

const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-step',
    name: 'Pierwszy Krok',
    description: 'Ukończ swój pierwszy rozdział',
    icon: '👶',
    category: 'starter',
    requirement: 1,
  },
  {
    id: 'early-bird',
    name: 'Wczesny Ptaszek',
    description: 'Zaloguj się przed 8:00 rano',
    icon: '🌅',
    category: 'special',
    requirement: 1,
  },
  {
    id: 'three-chapters',
    name: 'Trzy Rozdziały',
    description: 'Ukończ 3 rozdziały',
    icon: '📚',
    category: 'progress',
    requirement: 3,
  },
  {
    id: 'half-way',
    name: 'W Połowie Drogi',
    description: 'Ukończ 10 rozdziałów',
    icon: '🎯',
    category: 'progress',
    requirement: 10,
  },
  {
    id: 'dedicated',
    name: 'Zdeterminowany',
    description: 'Zaloguj się przez 7 dni z rzędu',
    icon: '🔥',
    category: 'special',
    requirement: 7,
  },
  {
    id: 'full-course',
    name: 'Pełny Kurs',
    description: 'Ukończ wszystkie 20 rozdziałów',
    icon: '🎓',
    category: 'master',
    requirement: 20,
  },
  {
    id: 'project-starter',
    name: 'Starter Projektów',
    description: 'Obejrzyj 5 projektów',
    icon: '🎨',
    category: 'progress',
    requirement: 5,
  },
  {
    id: 'ai-explorer',
    name: 'Odkrywca AI',
    description: 'Przeczytaj wszystkie rozdziały o AI',
    icon: '🤖',
    category: 'special',
    requirement: 1,
  },
  {
    id: 'safety-first',
    name: 'Bezpieczeństwo Przede Wszystkim',
    description: 'Ukończ rozdział o bezpieczeństwie',
    icon: '🛡️',
    category: 'starter',
    requirement: 1,
  },
  {
    id: 'master-influencer',
    name: 'Mistrz Influencer',
    description: 'Ukończ cały kurs i zdobądź wszystkie odznaki',
    icon: '👑',
    category: 'master',
    requirement: 1,
  },
];

export default function AchievementsPage() {
  const router = useRouter();
  const [unlockedAchievements, setUnlockedAchievements] = useState<UnlockedAchievement[]>([]);

  useEffect(() => {
    // Load unlocked achievements from localStorage
    const saved = localStorage.getItem('unlockedAchievements');
    if (saved) {
      try {
        setUnlockedAchievements(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing achievements:', e);
        setUnlockedAchievements([]);
      }
    }
  }, []);

  const unlockedIds = new Set(
    unlockedAchievements.map((ua) => ua.achievementId)
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'starter':
        return 'bg-gradient-warm';
      case 'progress':
        return 'bg-gradient-blue';
      case 'master':
        return 'bg-gradient-brown';
      case 'special':
        return 'bg-gradient-to-r from-purple-400 to-pink-400';
      default:
        return 'bg-gradient-warm';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'starter':
        return 'Start';
      case 'progress':
        return 'Postęp';
      case 'master':
        return 'Mistrz';
      case 'special':
        return 'Specjalne';
      default:
        return category;
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
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Twoje Osiągnięcia</h1>
              <p className="text-lg text-muted-foreground">
                Zdobyte: {unlockedAchievements.length} / {ALL_ACHIEVEMENTS.length}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {ALL_ACHIEVEMENTS.map((achievement, index) => {
            const isUnlocked = unlockedIds.has(achievement.id);
            const unlockedData = unlockedAchievements.find(
              (ua) => ua.achievementId === achievement.id
            );

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Card
                  className={`p-6 rounded-3xl shadow-warm transition-smooth relative overflow-hidden ${
                    !isUnlocked ? 'opacity-60' : ''
                  }`}
                >
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 opacity-10 transform translate-x-8 -translate-y-8 ${
                      getCategoryColor(achievement.category)
                    } rounded-full`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-warm ${
                          isUnlocked
                            ? getCategoryColor(achievement.category)
                            : 'bg-muted'
                        }`}
                      >
                        {isUnlocked ? (
                          <span>{achievement.icon}</span>
                        ) : (
                          <Lock className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>

                      <Badge
                        className={`${
                          isUnlocked
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : 'bg-muted text-muted-foreground border-muted'
                        }`}
                      >
                        {getCategoryLabel(achievement.category)}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {achievement.description}
                    </p>

                    {isUnlocked && unlockedData && (
                      <div className="flex items-center gap-2 text-xs text-green-600">
                        <Sparkles className="w-4 h-4" />
                        <span>
                          Odblokowano:{' '}
                          {new Date(unlockedData.unlockedAt).toLocaleDateString('pl-PL')}
                        </span>
                      </div>
                    )}

                    {!isUnlocked && (
                      <div className="text-xs text-muted-foreground">
                        Wymagane: {achievement.requirement}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
