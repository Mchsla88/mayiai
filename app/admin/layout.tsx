
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Settings,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated' && !(session?.user as any)?.isAdmin) {
      router.push('/');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!(session?.user as any)?.isAdmin) {
    return null;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: GraduationCap, label: 'Szkolenia', href: '/admin/trainings' },
    { icon: BookOpen, label: 'Ebooki', href: '/admin/ebooks' },
    { icon: FileText, label: 'Blog', href: '/admin/blog' },
    { icon: Settings, label: 'Strony', href: '/admin/pages' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-blue-900 to-blue-700 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-blue-600">
          {sidebarOpen && (
            <h1 className="text-xl font-bold">Panel CMS</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-blue-800 rounded-lg"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <item.icon size={20} />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-600">
          <Link
            href="/"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-800 transition-colors text-sm"
          >
            <span>← Powrót do strony</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
