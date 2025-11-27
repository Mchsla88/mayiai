
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  BookOpen, 
  ChevronDown,
  Shield,
  Target,
  TrendingUp,
  BarChart3,
  Users,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigation = [
  { 
    name: 'Strona Główna', 
    href: '/' 
  },
  {
    name: 'Usługi',
    href: '/uslugi',
    children: [
      { name: 'Konsulting Strategiczny', href: '/uslugi/konsulting-strategiczny', icon: Target },
      { name: 'Analiza Rynku', href: '/uslugi/analiza-rynku', icon: BarChart3 },
      { name: 'Transformacja Cyfrowa', href: '/uslugi/transformacja-cyfrowa', icon: TrendingUp },
      { name: 'Strategie Rozwoju', href: '/uslugi/strategie-rozwoju', icon: Users },
    ]
  },
  { 
    name: 'O Firmie', 
    href: '/o-firmie' 
  },
  { 
    name: 'Kontakt', 
    href: '/kontakt',
    icon: Phone
  }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Strategic<span className="text-blue-600">Consulting</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              item.children ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="h-10 px-4 py-2 text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    {item.children.map((child) => {
                      const IconComponent = child.icon;
                      return (
                        <DropdownMenuItem key={child.name} asChild>
                          <Link href={child.href} className="flex items-center">
                            {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                            {child.name}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            ) : session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-700">
                        {session.user.firstName || session.user.name || 'Użytkownik'}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm text-gray-500">
                    {session.user.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Panel użytkownika
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/ebook" className="flex items-center">
                      <BookOpen className="mr-2 h-4 w-4" />
                      E-book strategii
                    </Link>
                  </DropdownMenuItem>
                  {session.user.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center">
                        <Shield className="mr-2 h-4 w-4" />
                        Panel admina
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Wyloguj się
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Link href="/auth/login">Zaloguj się</Link>
                </Button>
                <Button 
                  size="sm" 
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Link href="/ebook">Dostęp do E-book</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.children ? (
                      <>
                        <div className="px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                          {item.name}
                        </div>
                        {item.children.map((child) => {
                          const IconComponent = child.icon;
                          return (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={closeMenu}
                              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ml-4 transition-colors duration-200 ${
                                pathname === child.href
                                  ? 'text-blue-600 bg-blue-50'
                                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                              }`}
                            >
                              {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                              {child.name}
                            </Link>
                          );
                        })}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                          pathname === item.href
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile Auth Section */}
                <div className="pt-4 border-t border-gray-200">
                  {session?.user ? (
                    <div className="space-y-1">
                      <div className="px-3 py-2 text-sm text-gray-500">
                        Zalogowano jako: {session.user.email}
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={closeMenu}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      >
                        Panel użytkownika
                      </Link>
                      <Link
                        href="/ebook"
                        onClick={closeMenu}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      >
                        E-book strategii
                      </Link>
                      {session.user.isAdmin && (
                        <Link
                          href="/admin"
                          onClick={closeMenu}
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        >
                          Panel admina
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleSignOut();
                          closeMenu();
                        }}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                      >
                        Wyloguj się
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        href="/auth/login"
                        onClick={closeMenu}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      >
                        Zaloguj się
                      </Link>
                      <Link
                        href="/ebook"
                        onClick={closeMenu}
                        className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Dostęp do E-book
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
