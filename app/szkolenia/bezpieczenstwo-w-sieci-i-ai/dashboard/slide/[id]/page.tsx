import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { checkUserAccess } from '@/lib/access';
import { getSlideById, getNextSlide, getPreviousSlide, slides } from '../../../lib/course-data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home, X } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { VisualSlideContent } from '@/components/dashboard/visual-slide-content';

export const dynamic = 'force-dynamic';

interface SlidePageProps {
  params: {
    id: string;
  };
}

export default async function SlidePage({ params }: SlidePageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  const hasAccess = await checkUserAccess(session.user.id, 'bezpieczenstwo-w-sieci-i-ai');

  if (!hasAccess) {
    redirect('/szkolenia/bezpieczenstwo-w-sieci-i-ai');
  }

  const slide = getSlideById(params.id);

  if (!slide) {
    notFound();
  }

  const nextSlide = getNextSlide(params.id);
  const previousSlide = getPreviousSlide(params.id);
  
  // Calculate slide number
  const currentSlideIndex = slides.findIndex(s => s.id === slide.id);
  const totalSlides = slides.length;

  // Map to VisualSlideContent format
  // We add backgroundColor which is required by VisualSlideContent but missing in our local Slide type
  const visualSlide = {
    ...slide,
    backgroundColor: 'from-blue-500 to-purple-600',
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-8 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        {/* Slide Container */}
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col relative min-h-[600px] border border-gray-200">
          
          {/* Header Bar */}
          <div className="bg-gray-50 border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
             <div className="flex items-center gap-3">
                <span className="text-2xl">{slide.icon}</span>
                <span className="font-semibold text-gray-700">Slajd {currentSlideIndex + 1} z {totalSlides}</span>
             </div>
             <Link href="/szkolenia/bezpieczenstwo-w-sieci-i-ai/dashboard">
               <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-200" title="Zamknij">
                 <X className="w-5 h-5" />
               </Button>
             </Link>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-gradient-to-br from-white to-blue-50">
             <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">{slide.title}</h1>
                
                {/* Visual Content */}
                {/* @ts-ignore - VisualSlideContent expects specific Slide type but ours is compatible enough */}
                <VisualSlideContent 
                  slide={visualSlide}
                  slideNumber={currentSlideIndex + 1}
                  totalSlides={totalSlides}
                />
             </div>
          </div>

          {/* Footer Navigation */}
          <div className="bg-white border-t px-6 py-4 flex items-center justify-between sticky bottom-0 z-10">
            {previousSlide ? (
              <Link href={`/szkolenia/bezpieczenstwo-w-sieci-i-ai/dashboard/slide/${previousSlide.id}`}>
                <Button variant="outline" size="lg" className="gap-2">
                  <ChevronLeft className="w-5 h-5" />
                  Poprzedni
                </Button>
              </Link>
            ) : (
              <Button variant="outline" size="lg" disabled className="opacity-50 cursor-not-allowed">
                <ChevronLeft className="w-5 h-5" />
                Poprzedni
              </Button>
            )}

            {/* Progress Bar */}
            <div className="hidden md:block flex-1 mx-8">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Postęp</span>
                <span>{Math.round(((currentSlideIndex + 1) / totalSlides) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
                />
              </div>
            </div>

            {nextSlide ? (
              <Link href={`/szkolenia/bezpieczenstwo-w-sieci-i-ai/dashboard/slide/${nextSlide.id}`}>
                <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                  Następny
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/szkolenia/bezpieczenstwo-w-sieci-i-ai/dashboard">
                <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                  Zakończ
                  <Home className="w-5 h-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
