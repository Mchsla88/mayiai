'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PAGE_KEYS = [
  { key: 'home_hero_title', label: 'Strona główna - Tytuł główny', type: 'text' },
  { key: 'home_hero_subtitle', label: 'Strona główna - Podtytuł', type: 'textarea' },
  { key: 'about_title', label: 'O nas - Tytuł', type: 'text' },
  { key: 'about_content', label: 'O nas - Treść', type: 'textarea' },
  { key: 'offer_intro', label: 'Oferta - Wprowadzenie', type: 'textarea' },
  { key: 'contact_intro', label: 'Kontakt - Wprowadzenie', type: 'textarea' },
];

export default function PagesPage() {
  const [contents, setContents] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await fetch('/api/admin/pages');
        const data = await response.json();
        const contentMap: Record<string, string> = {};
        data.forEach((page: any) => {
          contentMap[page.pageKey] = page.content;
        });
        setContents(contentMap);
      } catch (error) {
        console.error('Error fetching pages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContents();
  }, []);

  const handleSave = async (pageKey: string) => {
    setSaving(true);
    try {
      await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageKey,
          title: pageKey,
          content: contents[pageKey] || '',
        }),
      });
      alert('Zapisano pomyślnie!');
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Błąd podczas zapisywania');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edycja tekstów na stronach</h1>
        <p className="text-gray-600 mt-2">Zarządzaj treściami wyświetlanymi na różnych stronach</p>
      </div>

      <div className="space-y-6">
        {PAGE_KEYS.map((item) => (
          <div key={item.key} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{item.label}</h3>
              <Button
                onClick={() => handleSave(item.key)}
                disabled={saving}
                size="sm"
                className="flex items-center gap-2"
              >
                <Save size={16} />
                Zapisz
              </Button>
            </div>
            
            {item.type === 'text' ? (
              <input
                type="text"
                value={contents[item.key] || ''}
                onChange={(e) =>
                  setContents({ ...contents, [item.key]: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <textarea
                rows={6}
                value={contents[item.key] || ''}
                onChange={(e) =>
                  setContents({ ...contents, [item.key]: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-xl">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Wskazówka</h3>
        <p className="text-blue-800 text-sm">
          Te teksty będą wykorzystywane w odpowiednich miejscach na stronie. 
          Aby zastosować zmiany na stronie, możesz potrzebować zaktualizować
          komponenty, które wykorzystują te dane.
        </p>
      </div>
    </div>
  );
}
