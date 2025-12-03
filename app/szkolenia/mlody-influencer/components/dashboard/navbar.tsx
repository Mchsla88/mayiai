'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Award, BookOpen, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export function DashboardNavbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border shadow-warm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-smooth">
            <div className="w-10 h-10 bg-gradient-warm rounded-2xl flex items-center justify-center shadow-warm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">Młody Influencer</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="rounded-2xl gap-2">
                <Home className="w-4 h-4" />
                Strona główna
              </Button>
            </Link>
            <Link href="/dashboard/achievements">
              <Button variant="ghost" size="sm" className="rounded-2xl gap-2">
                <Award className="w-4 h-4" />
                Osiągnięcia
              </Button>
            </Link>
            <Link href="/dashboard/projects">
              <Button variant="ghost" size="sm" className="rounded-2xl gap-2">
                <BookOpen className="w-4 h-4" />
                Projekty
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
