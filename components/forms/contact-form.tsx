
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'CONSULTATION_REQUEST'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Wystąpił błąd podczas wysyłania');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        companyName: '',
        phone: '',
        subject: '',
        message: ''
      });

      toast({
        title: 'Formularz wysłany!',
        description: 'Skontaktujemy się z Tobą w ciągu 24 godzin.',
      });

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Wystąpił błąd');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-xl bg-green-50">
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              Dziękujemy za kontakt!
            </h3>
            <p className="text-green-700 mb-6">
              Twoja wiadomość została wysłana pomyślnie. Skontaktujemy się z Tobą w ciągu 24 godzin.
            </p>
            <Button 
              onClick={() => setSuccess(false)}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              Wyślij kolejną wiadomość
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Wyślij Wiadomość</CardTitle>
          <CardDescription>
            Wypełnij formularz, a skontaktujemy się z Tobą w ciągu 24 godzin
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Imię i nazwisko *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Jan Kowalski"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Adres email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jan@firma.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nazwa firmy</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="Firma Sp. z o.o."
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+48 123 456 789"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Temat *</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Bezpłatna konsultacja strategiczna"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Wiadomość *</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Opisz swoje potrzeby i oczekiwania..."
                className="min-h-[120px]"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Wysyłanie...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Wyślij Wiadomość
                </>
              )}
            </Button>

            <p className="text-sm text-gray-500 text-center">
              * Pola wymagane. Twoje dane są bezpieczne i nie będą udostępniane osobom trzecim.
            </p>
          </CardContent>
        </form>
      </Card>
    </motion.div>
  );
}
