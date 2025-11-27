
'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Zdjęcie' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        onChange(data.url);
        setPreviewUrl(data.url);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Błąd podczas przesyłania pliku');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {previewUrl ? (
        <div className="relative w-full h-48 rounded-lg border-2 border-gray-200 overflow-hidden group">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <Upload size={16} className="mr-2" />
                Zmień
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={handleRemove}
              >
                <X size={16} className="mr-2" />
                Usuń
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100"
        >
          {uploading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-3"></div>
              <p className="text-sm text-gray-600">Przesyłanie...</p>
            </div>
          ) : (
            <>
              <ImageIcon size={48} className="text-gray-400 mb-3" />
              <p className="text-sm text-gray-600">Kliknij aby wybrać zdjęcie</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF do 5MB</p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Alternative: manual URL input */}
      <div className="mt-2">
        <label className="block text-xs text-gray-500 mb-1">Lub podaj URL zdjęcia:</label>
        <input
          type="url"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setPreviewUrl(e.target.value);
          }}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
