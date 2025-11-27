'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PayButtonProps {
  amount: number;
  description: string;
  buyer: {
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
  className?: string;
  children?: React.ReactNode;
}

export function PayButton({ amount, description, buyer, className, children }: PayButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/payu/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          description,
          ...buyer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment initialization failed');
      }

      if (data.redirectUri) {
        // Redirect to PayU
        window.location.href = data.redirectUri;
      } else {
        throw new Error('No redirect URI received from PayU');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      toast.error('Wystąpił błąd podczas inicjowania płatności. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handlePayment} 
      disabled={loading} 
      className={className}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children || `Zapłać ${amount} PLN`}
    </Button>
  );
}
