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

export default function BezpieczenstwoAILanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-600 text-white">Szkolenie Online</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Bezpieczeństwo w sieci i w świecie AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Kompleksowy przewodnik online dla dzieci 9–16 lat i ich rodziców
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">90-120 minut</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">Dla dzieci i rodziców</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">24 praktyczne lekcje</span>
            </div>
          </div>

          <Link href="/szkolenia/bezpieczenstwo-w-sieci-i-ai/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
              <BookOpen className="w-5 h-5 mr-2" />
              Rozpocznij szkolenie
            </Button>
          </Link>
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
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Część I: Wprowadzenie (10-12 min)</CardTitle>
                <CardDescription>Witamy w cyfrowym świecie!</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Część II: Zagrożenia w sieci (25-30 min)</CardTitle>
                <CardDescription>Nieznajomi, phishing, cyberprzemoc, treści nieodpowiednie</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Część III: Bezpieczne korzystanie z internetu (25-30 min)</CardTitle>
                <CardDescription>Hasła, dane osobowe, zasady rodzinne</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Część IV: Świat AI (25-30 min)</CardTitle>
                <CardDescription>Czym jest AI, deepfake'i, prywatność, AI w szkole</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Część V: Co robić, gdy coś się stanie? (15-20 min)</CardTitle>
                <CardDescription>Kroki ratunkowe, jak reagować, gdzie szukać pomocy</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Część VI: Tworzymy rodzinne zasady (15-20 min)</CardTitle>
                <CardDescription>Rodzinna umowa cyfrowa, checklist</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Część VII: Podsumowanie i Q&A (10-15 min)</CardTitle>
                <CardDescription>Najważniejsze rzeczy, następne kroki, pytania i odpowiedzi</CardDescription>
              </CardHeader>
            </Card>
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
