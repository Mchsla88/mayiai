
'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/RichTextEditor';

interface Ebook {
  id: string;
  title: string;
  author: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  pages: number | null;
  coverUrl: string | null;
  tableOfContents: string | null;
  isActive: boolean;
}

export default function EbooksPage() {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEbook, setEditingEbook] = useState<Ebook | null>(null);

  const fetchEbooks = async () => {
    try {
      const response = await fetch('/api/admin/ebooks');
      setEbooks(await response.json());
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEbooks(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć?')) return;
    await fetch(`/api/admin/ebooks/${id}`, { method: 'DELETE' });
    fetchEbooks();
  };

  const toggleActive = async (ebook: Ebook) => {
    await fetch(`/api/admin/ebooks/${ebook.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...ebook, isActive: !ebook.isActive }),
    });
    fetchEbooks();
  };

  const openDialog = (ebook: Ebook | null = null) => {
    setEditingEbook(ebook);
    setDialogOpen(true);
  };

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ebooki</h1>
          <p className="text-gray-600 mt-2">Zarządzaj ofertą ebooków ({ebooks.length})</p>
        </div>
        <Button onClick={() => openDialog()}><Plus size={20} className="mr-2" />Dodaj ebook</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ebooks.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 mb-4">Brak ebooków. Kliknij "Dodaj ebook" aby utworzyć pierwszy.</p>
          </div>
        ) : (
          ebooks.map((ebook) => (
            <div key={ebook.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {ebook.coverUrl && (
                <div className="relative h-64 bg-gray-200">
                  <Image src={ebook.coverUrl} alt={ebook.title} fill className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => toggleActive(ebook)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${ebook.isActive ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}
                    >
                      {ebook.isActive ? 'Aktywny' : 'Nieaktywny'}
                    </button>
                  </div>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{ebook.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{ebook.author}</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{ebook.shortDescription}</p>
                
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="font-bold text-blue-600">{ebook.price} zł</span>
                  {ebook.pages && <span className="text-gray-500">{ebook.pages} stron</span>}
                </div>
                
                <div className="flex justify-end gap-2">
                  <button onClick={() => openDialog(ebook)} className="text-blue-600 hover:text-blue-900">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(ebook.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <EbookFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        ebook={editingEbook}
        onSuccess={fetchEbooks}
      />
    </div>
  );
}

function EbookFormDialog({ open, onOpenChange, ebook, onSuccess }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ebook: Ebook | null;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    title: '', author: '', shortDescription: '', fullDescription: '',
    price: '', pages: '', coverUrl: '', tableOfContents: '', isActive: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ebook) {
      setFormData({
        title: ebook.title, author: ebook.author,
        shortDescription: ebook.shortDescription,
        fullDescription: ebook.fullDescription,
        price: ebook.price.toString(),
        pages: ebook.pages?.toString() || '',
        coverUrl: ebook.coverUrl || '',
        tableOfContents: ebook.tableOfContents || '',
        isActive: ebook.isActive,
      });
    } else {
      setFormData({
        title: '', author: '', shortDescription: '', fullDescription: '',
        price: '', pages: '', coverUrl: '', tableOfContents: '', isActive: true,
      });
    }
  }, [ebook, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = ebook ? `/api/admin/ebooks/${ebook.id}` : '/api/admin/ebooks';
    const method = ebook ? 'PUT' : 'POST';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setLoading(false);
    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="text-2xl">{ebook ? '✏️ Edytuj ebook' : '➕ Dodaj nowy ebook'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ImageUpload
            value={formData.coverUrl}
            onChange={(url) => setFormData({...formData, coverUrl: url})}
            label="Okładka ebooka"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tytuł *</label>
              <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Tytuł ebooka" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Autor *</label>
              <input required type="text" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Imię i nazwisko autora" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Krótki opis *</label>
            <textarea required rows={2} value={formData.shortDescription} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Krótki opis w 1-2 zdaniach" />
          </div>

          <RichTextEditor
            value={formData.fullDescription}
            onChange={(value) => setFormData({...formData, fullDescription: value})}
            label="Pełny opis ebooka *"
            rows={8}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Cena (PLN) *</label>
              <input required type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="49.99" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Liczba stron</label>
              <input type="number" value={formData.pages} onChange={(e) => setFormData({...formData, pages: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="150" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Spis treści</label>
            <textarea rows={6} value={formData.tableOfContents} onChange={(e) => setFormData({...formData, tableOfContents: e.target.value})} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" placeholder="Rozdział 1: Wprowadzenie&#10;Rozdział 2: Podstawy AI&#10;Rozdział 3: Praktyczne przykłady" />
          </div>

          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} />
            <label htmlFor="isActive" className="text-sm font-medium">✅ Ebook aktywny (widoczny na stronie)</label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Anuluj</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Zapisywanie...' : '💾 Zapisz ebook'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
