
'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/RichTextEditor';

interface Training {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  duration: string;
  level: string;
  imageUrl: string | null;
  isActive: boolean;
}

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);

  const fetchTrainings = async () => {
    try {
      const response = await fetch('/api/admin/trainings');
      const data = await response.json();
      setTrainings(data);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć to szkolenie?')) return;
    try {
      await fetch(`/api/admin/trainings/${id}`, { method: 'DELETE' });
      fetchTrainings();
    } catch (error) {
      console.error('Error deleting training:', error);
    }
  };

  const toggleActive = async (training: Training) => {
    try {
      await fetch(`/api/admin/trainings/${training.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...training, isActive: !training.isActive }),
      });
      fetchTrainings();
    } catch (error) {
      console.error('Error toggling training status:', error);
    }
  };

  const openDialog = (training: Training | null = null) => {
    setEditingTraining(training);
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Szkolenia</h1>
          <p className="text-gray-600 mt-2">Zarządzaj ofertą szkoleń ({trainings.length})</p>
        </div>
        <Button onClick={() => openDialog()} className="flex items-center gap-2">
          <Plus size={20} />
          Dodaj szkolenie
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainings.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 mb-4">Brak szkoleń. Kliknij "Dodaj szkolenie" aby utworzyć pierwsze.</p>
          </div>
        ) : (
          trainings.map((training) => (
            <div key={training.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {training.imageUrl && (
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={training.imageUrl}
                    alt={training.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => toggleActive(training)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        training.isActive
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-500 text-white'
                      }`}
                    >
                      {training.isActive ? 'Aktywne' : 'Nieaktywne'}
                    </button>
                  </div>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{training.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{training.shortDescription}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="font-medium">{training.price} zł</span>
                  <span>{training.duration}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className={`px-2 py-1 rounded text-xs ${
                    training.level === 'BEGINNER' ? 'bg-green-100 text-green-800' :
                    training.level === 'INTERMEDIATE' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {training.level === 'BEGINNER' && 'Początkujący'}
                    {training.level === 'INTERMEDIATE' && 'Średniozaawansowany'}
                    {training.level === 'ADVANCED' && 'Zaawansowany'}
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => openDialog(training)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(training.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <TrainingFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        training={editingTraining}
        onSuccess={fetchTrainings}
      />
    </div>
  );
}

function TrainingFormDialog({
  open,
  onOpenChange,
  training,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  training: Training | null;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    duration: '',
    level: 'BEGINNER',
    imageUrl: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (training) {
      setFormData({
        title: training.title,
        shortDescription: training.shortDescription,
        fullDescription: training.fullDescription,
        price: training.price.toString(),
        duration: training.duration,
        level: training.level,
        imageUrl: training.imageUrl || '',
        isActive: training.isActive,
      });
    } else {
      setFormData({
        title: '',
        shortDescription: '',
        fullDescription: '',
        price: '',
        duration: '',
        level: 'BEGINNER',
        imageUrl: '',
        isActive: true,
      });
    }
  }, [training, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = training ? `/api/admin/trainings/${training.id}` : '/api/admin/trainings';
      const method = training ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving training:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {training ? '✏️ Edytuj szkolenie' : '➕ Dodaj nowe szkolenie'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ImageUpload
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            label="Zdjęcie szkolenia"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tytuł szkolenia *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="np. Wprowadzenie do AI dla dzieci"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Krótki opis (wyświetlany na karcie) *
            </label>
            <textarea
              required
              rows={2}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Krótki opis szkolenia w 1-2 zdaniach"
            />
          </div>

          <RichTextEditor
            value={formData.fullDescription}
            onChange={(value) => setFormData({ ...formData, fullDescription: value })}
            label="Pełny opis szkolenia *"
            rows={10}
          />

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cena (PLN) *
              </label>
              <input
                type="number"
                required
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="299"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Czas trwania *
              </label>
              <input
                type="text"
                required
                placeholder="np. 3 godziny"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Poziom trudności *
              </label>
              <select
                required
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="BEGINNER">Początkujący</option>
                <option value="INTERMEDIATE">Średniozaawansowany</option>
                <option value="ADVANCED">Zaawansowany</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              ✅ Szkolenie aktywne (widoczne na stronie)
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Anuluj
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Zapisywanie...' : '💾 Zapisz szkolenie'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
