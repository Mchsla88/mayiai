
'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/RichTextEditor';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  author: string;
  isPublished: boolean;
  publishedAt: string | null;
  tags: string[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/blog');
      setPosts(await response.json());
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć?')) return;
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
    fetchPosts();
  };

  const togglePublish = async (post: BlogPost) => {
    await fetch(`/api/admin/blog/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...post, isPublished: !post.isPublished }),
    });
    fetchPosts();
  };

  const openDialog = (post: BlogPost | null = null) => {
    setEditingPost(post);
    setDialogOpen(true);
  };

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-600 mt-2">Zarządzaj artykułami blogowymi ({posts.length})</p>
        </div>
        <Button onClick={() => openDialog()}><Plus size={20} className="mr-2" />Dodaj artykuł</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 mb-4">Brak artykułów. Kliknij "Dodaj artykuł" aby utworzyć pierwszy.</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {post.featuredImage && (
                <div className="relative h-48 bg-gray-200">
                  <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => togglePublish(post)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${post.isPublished ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}
                    >
                      {post.isPublished ? 'Opublikowany' : 'Szkic'}
                    </button>
                  </div>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                {post.excerpt && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>}
                
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <Calendar size={14} className="mr-1" />
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('pl-PL') : 'Nie opublikowano'}
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="text-xs text-gray-500">{post.author}</span>
                  <div className="flex gap-2">
                    <button onClick={() => openDialog(post)} className="text-blue-600 hover:text-blue-900">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <BlogFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        post={editingPost}
        onSuccess={fetchPosts}
      />
    </div>
  );
}

function BlogFormDialog({ open, onOpenChange, post, onSuccess }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: BlogPost | null;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    title: '', excerpt: '', content: '', featuredImage: '',
    author: 'Administrator', isPublished: false, tags: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title, excerpt: post.excerpt || '', content: post.content,
        featuredImage: post.featuredImage || '', author: post.author,
        isPublished: post.isPublished, tags: post.tags?.join(', ') || '',
      });
    } else {
      setFormData({
        title: '', excerpt: '', content: '', featuredImage: '',
        author: 'Administrator', isPublished: false, tags: '',
      });
    }
  }, [post, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = post ? `/api/admin/blog/${post.id}` : '/api/admin/blog';
    const method = post ? 'PUT' : 'POST';
    
    const submitData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submitData),
    });
    setLoading(false);
    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="text-2xl">{post ? '✏️ Edytuj artykuł' : '➕ Dodaj nowy artykuł'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ImageUpload
            value={formData.featuredImage}
            onChange={(url) => setFormData({...formData, featuredImage: url})}
            label="Zdjęcie wyróżniające"
          />

          <div>
            <label className="block text-sm font-medium mb-1">Tytuł artykułu *</label>
            <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Wpisz tytuł artykułu" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Krótki opis (excerpt)</label>
            <textarea rows={2} value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Krótkie streszczenie artykułu dla wyszukiwarek" />
          </div>

          <RichTextEditor
            value={formData.content}
            onChange={(value) => setFormData({...formData, content: value})}
            label="Treść artykułu *"
            rows={14}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Autor</label>
              <input type="text" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Imię i nazwisko" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tagi (oddzielone przecinkami)</label>
              <input type="text" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} placeholder="AI, dzieci, edukacja" className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>

          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <input type="checkbox" id="isPublished" checked={formData.isPublished} onChange={(e) => setFormData({...formData, isPublished: e.target.checked})} />
            <label htmlFor="isPublished" className="text-sm font-medium">
              ✅ Opublikuj artykuł (będzie widoczny na stronie)
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Anuluj</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Zapisywanie...' : '💾 Zapisz artykuł'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
