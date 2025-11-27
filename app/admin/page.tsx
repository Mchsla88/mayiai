
'use client';

import { useEffect, useState } from 'react';
import { BookOpen, GraduationCap, FileText, Users } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    trainings: 0,
    ebooks: 0,
    blogPosts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [trainingsRes, ebooksRes, blogRes] = await Promise.all([
          fetch('/api/admin/trainings'),
          fetch('/api/admin/ebooks'),
          fetch('/api/admin/blog'),
        ]);

        const [trainings, ebooks, blogPosts] = await Promise.all([
          trainingsRes.json(),
          ebooksRes.json(),
          blogRes.json(),
        ]);

        setStats({
          trainings: trainings.length || 0,
          ebooks: ebooks.length || 0,
          blogPosts: blogPosts.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Szkolenia',
      value: stats.trainings,
      icon: GraduationCap,
      color: 'bg-blue-500',
      href: '/admin/trainings',
    },
    {
      title: 'Ebooki',
      value: stats.ebooks,
      icon: BookOpen,
      color: 'bg-green-500',
      href: '/admin/ebooks',
    },
    {
      title: 'Artykuły',
      value: stats.blogPosts,
      icon: FileText,
      color: 'bg-purple-500',
      href: '/admin/blog',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Witaj w panelu administracyjnym</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {card.value}
                </p>
              </div>
              <div className={`${card.color} p-4 rounded-full`}>
                <card.icon size={24} className="text-white" />
              </div>
            </div>
            <a
              href={card.href}
              className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium inline-block"
            >
              Zarządzaj →
            </a>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Szybki start
        </h2>
        <div className="space-y-3">
          <p className="text-gray-600">
            • Dodaj nowe szkolenia w zakładce <strong>Szkolenia</strong>
          </p>
          <p className="text-gray-600">
            • Zarządzaj ebookami w zakładce <strong>Ebooki</strong>
          </p>
          <p className="text-gray-600">
            • Publikuj artykuły w zakładce <strong>Blog</strong>
          </p>
          <p className="text-gray-600">
            • Edytuj teksty na stronach w zakładce <strong>Strony</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
