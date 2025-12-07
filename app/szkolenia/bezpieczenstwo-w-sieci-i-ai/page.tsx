import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Shield, Users, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bezpieczeństwo w sieci i w świecie AI | Twoje Szkolenia',
  description: 'Kompleksowy przewodnik po bezpieczeństwie online dla dzieci 9-16 lat i ich rodziców. Naucz się rozpoznawać zagrożenia, bezpiecznie korzystać z internetu i AI.'
};

import { Navbar } from '@/components/navbar';
import { courseParts } from './lib/course-data';
import Image from 'next/image';

// ... existing imports

export default function BezpieczenstwoAILanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left animate-in slide-in-from-left duration-700">
            <Badge className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-sm rounded-full transition-colors">
              Szkolenie Online
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Bezpieczeństwo<br />
              w sieci i w świecie <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              Kompleksowy przewodnik online dla dzieci 9–16 lat i ich rodziców. Naucz się rozpoznawać zagrożenia i korzystać z technologii mądrze.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-blue-100">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">90-120 min</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-purple-100">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-slate-700">Dla rodzin</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-green-100">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-slate-700">24 lekcje</span>
              </div>
            </div>

            <Link href="/szkolenia/bezpieczenstwo-w-sieci-i-ai/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg rounded-2xl shadow-lg shadow-blue-200 transition-all hover:scale-105">
                <BookOpen className="w-5 h-5 mr-2" />
                Rozpocznij szkolenie
              </Button>
            </Link>
          </div>

          <div className="relative h-[400px] md:h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 animate-in slide-in-from-right duration-700 delay-200">
            <Image 
              src="/safety-hero.png" 
              alt="Cyber Safety Shield" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent pointer-events-none" />
            
            {/* Floating Cards / Decorative Elements */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500 rounded-full">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="font-bold text-sm">Status Ochrony</p>
                        <p className="text-xs text-green-200">Aktywny</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Co się nauczysz */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Czego się nauczysz?</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-blue-600" />
                    Dla Dzieci (9–16 lat)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Rozpoznawać zagrożenia w sieci (nieznajomi, oszustwa, cyberprzemoc)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Bezpiecznie korzystać z internetu i AI</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Wiedzieć, co zrobić, gdy coś pójdzie nie tak</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Chronić swoje dane osobowe i prywatność</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-6 h-6 text-purple-600" />
                    Dla Rodziców
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Zrozumieć świat online, w którym żyją wasze dzieci</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Wspierać dzieci bez nadmiernej kontroli</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Reagować na konkretne sytuacje kryzysowe</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Budować zaufanie i otwartą komunikację</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Program szkolenia */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Program Szkolenia</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {courseParts.map((part) => (
              <Card key={part.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 flex items-start gap-4">
                  <div className="relative w-16 h-16 shrink-0 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                     <Image 
                        src={part.icon} 
                        alt={part.title}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                       <Badge variant="secondary" className="bg-white/80 backdrop-blur text-xs">
                          {part.duration}
                       </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight mb-2">{part.title}</CardTitle>
                    <CardDescription>
                       Zawiera {part.slides.length} {part.slides.length === 1 ? 'lekcję' : part.slides.length < 5 ? 'lekcje' : 'lekcji'}
                    </CardDescription>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/szkolenia/bezpieczenstwo-w-sieci-i-ai/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Rozpocznij teraz
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
