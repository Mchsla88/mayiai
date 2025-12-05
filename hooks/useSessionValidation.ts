'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function useSessionValidation() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const hasShownToast = useRef(false);
  
  const validateSession = useCallback(async () => {
    if (status !== 'authenticated' || !session?.user?.id) {
      return;
    }
    
    try {
      const response = await fetch('/api/auth/validate-session');
      const data = await response.json();
      
      if (!data.valid && data.reason === 'session_invalidated') {
        if (!hasShownToast.current) {
          hasShownToast.current = true;
          toast.error('Twoje konto zostało zalogowane na innym urządzeniu. Zostałeś wylogowany.');
        }
        
        // Sign out without redirect, then redirect manually
        await signOut({ redirect: false });
        router.push('/auth/login?reason=session_invalidated');
      }
    } catch (error) {
      console.error('[SESSION_VALIDATION] Error:', error);
    }
  }, [session, status, router]);
  
  useEffect(() => {
    // Validate session on mount
    validateSession();
    
    // Validate session every 30 seconds
    const interval = setInterval(validateSession, 30000);
    
    // Validate session on window focus (user comes back to tab)
    const handleFocus = () => {
      validateSession();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [validateSession]);
  
  return { session, status };
}
