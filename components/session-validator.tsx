'use client';

import { useSessionValidation } from '@/hooks/useSessionValidation';

/**
 * Component that validates user session on protected pages.
 * Add this component to pages that require authentication.
 * It will automatically log out users if their session is invalidated
 * (e.g., when they log in on another device).
 */
export function SessionValidator({ children }: { children: React.ReactNode }) {
  useSessionValidation();
  return <>{children}</>;
}
