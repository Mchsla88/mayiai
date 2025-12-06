
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      firstName?: string;
      lastName?: string;
      companyName?: string;
      isAdmin: boolean;
      role: string;
      sessionId?: string; // For single-session enforcement
    } & DefaultSession['user'];
  }

  interface User {
    isAdmin: boolean;
    role: string;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    sessionId?: string; // For single-session enforcement
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isAdmin: boolean;
    role: string;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    sessionId?: string; // For single-session enforcement
  }
}
