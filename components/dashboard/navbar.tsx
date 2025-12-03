'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Sparkles, Award, BookOpen, Home, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export function DashboardNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border shadow-warm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/szkolenia/mlody-influencer/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-smooth">
            <div className="w-10 h-10 bg-gradient-warm rounded-2xl flex items-center justify-center shadow-warm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">Młody Influencer</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="rounded-2xl gap-2">
                <Home className="w-4 h-4" />
                <span className="hidden md:inline">Strona główna</span>
              </Button>
            </Link>
            <Link href="/szkolenia/mlody-influencer/dashboard/achievements">
              <Button variant="ghost" size="sm" className="rounded-2xl gap-2">
                <Award className="w-4 h-4" />
                <span className="hidden md:inline">Osiągnięcia</span>
              </Button>
            </Link>
            <Link href="/szkolenia/mlody-influencer/dashboard/projects">
              <Button variant="ghost" size="sm" className="rounded-2xl gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden md:inline">Projekty</span>
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-2xl gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Wyloguj</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
