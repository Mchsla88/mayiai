import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { checkUserAccess } from '@/lib/access';
import { courseParts, slides } from '../lib/course-data';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, PlayCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

import { Navbar } from '@/components/navbar';

export default async function BezpieczenstwoAIDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/login?callbackUrl=/szkolenia/bezpieczenstwo-w-sieci-i-ai/dashboard');
  }

  const hasAccess = await checkUserAccess(session.user.id, 'bezpieczenstwo-w-sieci-i-ai');

  if (!hasAccess) {
    redirect('/szkolenia/bezpieczenstwo-w-sieci-i-ai');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Bezpieczeństwo w sieci i w świecie AI
            </h1>
            <p className="text-gray-600">
              Twój przewodnik po bezpiecznym korzystaniu z internetu
            </p>
          </div>

          {/* Course Parts */}
          <div className="space-y-6">
            {courseParts.map((part) => {
              const partSlides = slides.filter(s => s.part === part.id);
              
              return (
                <Card key={part.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                          <CardTitle className="text-2xl mb-2 flex items-center gap-3">
                             {typeof part.icon === 'string' && part.icon.startsWith('/') ? (
                                <div className="relative w-8 h-8 flex-shrink-0">
                                  <Image 
                                    src={part.icon} 
                                    alt="" 
                                    fill 
                                    className="object-contain"
                                  />
                                </div>
                              ) : (
                                <span className="text-2xl">{part.icon}</span>
                              )}
                            <span>{part.title}</span>
                          </CardTitle>
                        <CardDescription className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {part.duration}
                          </span>
                          <Badge variant="outline">
                            {partSlides.length} slajdów
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {partSlides.map((slide) => (
                        <Link 
                          key={slide.id} 
                          href={`/szkolenia/bezpieczenstwo-w-sieci-i-ai/dashboard/slide/${slide.id}`}
                        >
                          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader>
                              <CardTitle className="text-base flex items-start gap-3">
                                {typeof slide.icon === 'string' && slide.icon.startsWith('/') ? (
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Image 
                                      src={slide.icon} 
                                      alt="" 
                                      fill 
                                      className="object-contain"
                                    />
                                  </div>
                                ) : (
                                  <span className="text-2xl">{slide.icon}</span>
                                )}
                                <div className="flex-1">
                                  <div className="font-semibold">{slide.title}</div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {slide.duration}
                                  </div>
                                </div>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {slide.description}
                              </p>
                              <div className="mt-4">
                                <Button size="sm" variant="outline" className="w-full">
                                  <PlayCircle className="w-4 h-4 mr-2" />
                                  Rozpocznij
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
