
'use client';

import { useState } from 'react';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  rows?: number;
}

export default function RichTextEditor({ value, onChange, label, rows = 10 }: RichTextEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || 'tekst';
    const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newValue);
    
    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center gap-1">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => insertMarkdown('**', '**')}
            title="Pogrubienie"
          >
            <Bold size={16} />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => insertMarkdown('*', '*')}
            title="Kursywa"
          >
            <Italic size={16} />
          </Button>
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => insertMarkdown('\n# ', '')}
            title="Nagłówek 1"
          >
            <Heading1 size={16} />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => insertMarkdown('\n## ', '')}
            title="Nagłówek 2"
          >
            <Heading2 size={16} />
          </Button>
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => insertMarkdown('\n- ', '')}
            title="Lista punktowana"
          >
            <List size={16} />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => insertMarkdown('\n1. ', '')}
            title="Lista numerowana"
          >
            <ListOrdered size={16} />
          </Button>
          <div className="flex-1"></div>
          <Button
            type="button"
            size="sm"
            variant={showPreview ? 'default' : 'ghost'}
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye size={16} className="mr-1" />
            {showPreview ? 'Edycja' : 'Podgląd'}
          </Button>
        </div>

        {/* Editor / Preview */}
        {showPreview ? (
          <div className="p-4 prose prose-sm max-w-none min-h-[200px] bg-white">
            <div dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br>') }} />
          </div>
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className="w-full px-4 py-3 focus:outline-none resize-none font-mono text-sm"
            placeholder="Wprowadź treść... (obsługuje Markdown)"
          />
        )}
      </div>
      
      <p className="text-xs text-gray-500">
        Wskazówka: Użyj **pogrubienie**, *kursywa*, # Nagłówek, - lista
      </p>
    </div>
  );
}
