import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { checkUserAccess } from '@/lib/access';
import { getSlideById, getNextSlide, getPreviousSlide } from '../../../lib/course-data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Home, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/szkolenia/bezpieczenstwo-w-sieci-i-ai/dashboard">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Powrót do dashboardu
              </Button>
            </Link>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {slide.duration}
            </Badge>
          </div>

          {/* Slide Content */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <span className="text-4xl">{slide.icon}</span>
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-2">{slide.title}</CardTitle>
                  <p className="text-gray-600">{slide.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown>{slide.content}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            {previousSlide ? (
              <Link href={`/szkolenia/bezpieczenstwo-w-sieci-i-ai/dashboard/slide/${previousSlide.id}`}>
                <Button variant="outline">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Poprzedni slajd
                </Button>
              </Link>
            ) : (
              <div />
            )}

            {nextSlide ? (
              <Link href={`/szkolenia/bezpieczenstwo-w-sieci-i-ai/dashboard/slide/${nextSlide.id}`}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Następny slajd
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link href="/szkolenia/bezpieczenstwo-w-sieci-i-ai/dashboard">
                <Button className="bg-green-600 hover:bg-green-700">
                  Zakończ szkolenie
                  <Home className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
