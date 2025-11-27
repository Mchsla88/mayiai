
'use client';

import { SessionProvider } from 'next-auth/react';
import { useState, useEffect } from 'react';

interface SessionProvidersProps {
  children: React.ReactNode;
}

export function SessionProviders({ children }: SessionProvidersProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <SessionProvider>{children}</SessionProvider>;
}
