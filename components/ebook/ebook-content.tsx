
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight, 
  List,
  BarChart3,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ReactMarkdown from 'react-markdown';
import type { EbookChapter, EbookProgress } from '@prisma/client';

interface EbookContentProps {
  chapters: EbookChapter[];
  userProgress: (EbookProgress & { chapter: EbookChapter })[];
}

export default function EbookContent({ chapters, userProgress }: EbookContentProps) {
  const [selectedChapter, setSelectedChapter] = useState<EbookChapter | null>(chapters[0] || null);
  const [showTOC, setShowTOC] = useState(true);

  const completedChapters = userProgress.filter(p => p.isCompleted).length;
  const progressPercentage = chapters.length > 0 ? (completedChapters / chapters.length) * 100 : 0;

  const isChapterCompleted = (chapterId: string) => {
    return userProgress.some(p => p.chapterId === chapterId && p.isCompleted);
  };

  const markChapterCompleted = async (chapterId: string) => {
    try {
      const response = await fetch('/api/ebook/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapterId, isCompleted: true })
      });

      if (response.ok) {
        // Update UI optimistically
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const getCurrentChapterIndex = () => {
    return chapters.findIndex(c => c.id === selectedChapter?.id);
  };

  const goToNextChapter = () => {
    const currentIndex = getCurrentChapterIndex();
    if (currentIndex < chapters.length - 1) {
      setSelectedChapter(chapters[currentIndex + 1]!);
    }
  };

  const goToPrevChapter = () => {
    const currentIndex = getCurrentChapterIndex();
    if (currentIndex > 0) {
      setSelectedChapter(chapters[currentIndex - 1]!);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-8">
          {/* Sidebar - Table of Contents */}
          <div className={`lg:col-span-1 ${showTOC ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                  Strategia Biznesowa
                </CardTitle>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Postęp</span>
                    <span>{completedChapters}/{chapters.length}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {chapters.map((chapter, index) => (
                  <motion.div
                    key={chapter.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => setSelectedChapter(chapter)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        selectedChapter?.id === chapter.id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {isChapterCompleted(chapter.id) ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-xs text-gray-500">{index + 1}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                            {chapter.title}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {chapter.estimatedReadTime || 5} min
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedChapter ? (
              <motion.div
                key={selectedChapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Chapter Header */}
                <Card>
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowTOC(!showTOC)}
                        className="lg:hidden"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">
                          Rozdział {getCurrentChapterIndex() + 1}
                        </Badge>
                        {isChapterCompleted(selectedChapter.id) && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Ukończono
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-2xl lg:text-3xl">
                        {selectedChapter.title}
                      </CardTitle>
                      {selectedChapter.excerpt && (
                        <p className="text-gray-600">{selectedChapter.excerpt}</p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{selectedChapter.estimatedReadTime || 5} min czytania</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-8">
                    <div className="prose prose-lg max-w-none">
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => (
                            <p className="text-gray-700 leading-relaxed mb-4">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="space-y-2 mb-4 ml-6">
                              {children}
                            </ul>
                          ),
                          li: ({ children }) => (
                            <li className="text-gray-700 flex items-start">
                              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                              {children}
                            </li>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-gray-900">
                              {children}
                            </strong>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-600 my-6">
                              {children}
                            </blockquote>
                          )
                        }}
                      >
                        {selectedChapter.content}
                      </ReactMarkdown>
                    </div>
                  </CardContent>
                </Card>

                {/* Chapter Actions */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="flex items-center space-x-4">
                        <Button
                          onClick={goToPrevChapter}
                          disabled={getCurrentChapterIndex() === 0}
                          variant="outline"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Poprzedni
                        </Button>
                        <Button
                          onClick={goToNextChapter}
                          disabled={getCurrentChapterIndex() === chapters.length - 1}
                          variant="outline"
                        >
                          Następny
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>

                      {!isChapterCompleted(selectedChapter.id) && (
                        <Button
                          onClick={() => markChapterCompleted(selectedChapter.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Oznacz jako przeczytane
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Progress Summary */}
                {getCurrentChapterIndex() === chapters.length - 1 && (
                  <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <h3 className="text-2xl font-bold">
                          Gratulacje! 🎉
                        </h3>
                        <p className="text-blue-100">
                          Ukończyłeś e-book &quot;Strategia Biznesowa dla Polskich Firm&quot;. 
                          Teraz czas zastosować zdobytą wiedzę w praktyce!
                        </p>
                        <div className="flex justify-center space-x-4">
                          <Button variant="secondary" size="lg">
                            Pobierz Certyfikat
                          </Button>
                          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                            Umów Konsultację
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Wybierz rozdział do czytania
                  </h3>
                  <p className="text-gray-600">
                    Kliknij na rozdział z menu po lewej stronie, aby rozpocząć czytanie.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
