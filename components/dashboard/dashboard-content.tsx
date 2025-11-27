
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  User, 
  BookOpen, 
  Mail, 
  Calendar, 
  Settings, 
  TrendingUp, 
  FileText,
  Clock,
  CheckCircle,
  ExternalLink,
  Award,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Subscription, ContactFormSubmission } from '@prisma/client';

interface DashboardUser {
  id: string;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  companyName?: string | null;
  isAdmin: boolean;
  role: string;
  createdAt: Date;
}

interface DashboardContentProps {
  user: DashboardUser;
  subscriptions: Subscription[];
  ebookProgress: {
    completed: number;
    total: number;
  };
  formSubmissions: ContactFormSubmission[];
}

export default function DashboardContent({
  user,
  subscriptions,
  ebookProgress,
  formSubmissions
}: DashboardContentProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const activeSubscription = subscriptions.find(
    s => s.status === 'ACTIVE' && s.endDate && s.endDate > new Date()
  );

  const progressPercentage = ebookProgress.total > 0 
    ? (ebookProgress.completed / ebookProgress.total) * 100 
    : 0;

  return (
    <div className="section-container section-padding">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Cześć, {user.firstName || user.name}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Witaj w Twoim osobistym panelu Strategic Consulting
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant={activeSubscription ? "default" : "secondary"}>
              {activeSubscription ? 'Aktywna subskrypcja' : 'Brak subskrypcji'}
            </Badge>
            {user.isAdmin && (
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                Administrator
              </Badge>
            )}
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {ebookProgress.completed}/{ebookProgress.total}
                </div>
                <div className="text-sm text-gray-600">Rozdziałów ukończono</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{formSubmissions.length}</div>
                <div className="text-sm text-gray-600">Wysłanych zapytań</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(progressPercentage)}%
                </div>
                <div className="text-sm text-gray-600">Postęp w e-book</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* E-book Progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                  Postęp w E-book
                </CardTitle>
                <CardDescription>
                  Twój postęp w &quot;Strategia Biznesowa dla Polskich Firm&quot;
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Ukończone rozdziały</span>
                    <span>{ebookProgress.completed} z {ebookProgress.total}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>

                {activeSubscription ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="flex-1">
                      <Link href="/ebook">
                        Kontynuuj czytanie
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    {progressPercentage === 100 && (
                      <Button variant="outline" className="flex-1">
                        <Award className="mr-2 h-4 w-4" />
                        Pobierz Certyfikat
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">
                          Potrzebujesz aktywnej subskrypcji
                        </h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Aby uzyskać dostęp do pełnego e-booka, musisz wykupić subskrypcję.
                        </p>
                        <Button size="sm" className="mt-3">
                          Kup dostęp
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-gray-600" />
                  Ostatnia Aktywność
                </CardTitle>
              </CardHeader>
              <CardContent>
                {formSubmissions.length > 0 ? (
                  <div className="space-y-4">
                    {formSubmissions.slice(0, 3).map((submission, index) => (
                      <div key={submission.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-3" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {submission.subject}
                          </p>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {submission.message}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge 
                              variant={
                                submission.status === 'NEW' ? 'default' : 
                                submission.status === 'IN_PROGRESS' ? 'secondary' : 
                                'outline'
                              }
                              className="text-xs"
                            >
                              {submission.status === 'NEW' ? 'Nowe' :
                               submission.status === 'IN_PROGRESS' ? 'W trakcie' :
                               submission.status === 'COMPLETED' ? 'Zakończone' :
                               'Zamknięte'}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(submission.createdAt).toLocaleDateString('pl-PL')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Brak ostatniej aktywności</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Account Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-gray-600" />
                  Informacje o koncie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Imię i nazwisko</label>
                  <p className="text-gray-900">{user.firstName} {user.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                {user.companyName && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Firma</label>
                    <p className="text-gray-900">{user.companyName}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-700">Data dołączenia</label>
                  <p className="text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString('pl-PL')}
                  </p>
                </div>
                <Separator />
                <Button variant="outline" size="sm" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Edytuj profil
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Subscription Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-gray-600" />
                  Status subskrypcji
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeSubscription ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Aktywna
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Typ</span>
                      <span className="text-sm">Dostęp do E-book</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Wygasa</span>
                      <span className="text-sm">
                        {activeSubscription.endDate 
                          ? new Date(activeSubscription.endDate).toLocaleDateString('pl-PL')
                          : 'Nigdy'
                        }
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-600 mb-4">Brak aktywnej subskrypcji</p>
                    <Button size="sm" asChild>
                      <Link href="/ebook">
                        Wykup dostęp
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Szybkie akcje</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/kontakt">
                    <Calendar className="mr-2 h-4 w-4" />
                    Umów konsultację
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/uslugi">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Zobacz usługi
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/o-firmie">
                    <User className="mr-2 h-4 w-4" />
                    O Strategic Consulting
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
