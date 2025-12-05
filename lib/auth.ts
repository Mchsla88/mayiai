
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './db';
import { v4 as uuidv4 } from 'uuid';

export const authOptions: NextAuthOptions = {
  // NOTE: PrismaAdapter is not compatible with CredentialsProvider
  // When using credentials, we must use JWT sessions
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('[AUTH_DEBUG] Authorize called with:', { email: credentials?.email });

        if (!credentials?.email || !credentials?.password) {
          console.log('[AUTH_DEBUG] Missing credentials');
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });

          console.log('[AUTH_DEBUG] User lookup result:', user ? 'Found' : 'Not Found');

          if (!user || !user.password) {
            console.log('[AUTH_DEBUG] User not found or no password');
            return null;
          }

          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          console.log('[AUTH_DEBUG] Password match:', passwordMatch);

          if (!passwordMatch) {
            return null;
          }

          // Generate unique session ID for single-session enforcement
          const sessionId = uuidv4();
          
          // Save session ID to database - this invalidates any other active sessions
          await prisma.user.update({
            where: { id: user.id },
            data: { activeSessionId: sessionId }
          });
          
          console.log('[AUTH_DEBUG] New session created:', sessionId.substring(0, 8) + '...');

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            isAdmin: user.isAdmin,
            role: user.role,
            firstName: user.firstName ?? undefined,
            lastName: user.lastName ?? undefined,
            companyName: user.companyName ?? undefined,
            sessionId: sessionId, // Include session ID in user object
          };
        } catch (error) {
          console.error('[AUTH_DEBUG] Error in authorize:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/login'
  },
  callbacks: {
    async signIn({ user }) {
      // Allow sign in
      return true
    },
    async redirect({ url, baseUrl }) {
      // After sign in, redirect to dashboard
      if (url === baseUrl) {
        return `${baseUrl}/dashboard`
      }
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.companyName = user.companyName;
        token.sessionId = user.sessionId; // Store session ID in JWT
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.role = token.role as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.companyName = token.companyName as string;
        session.user.sessionId = token.sessionId as string; // Include session ID in session
      }
      return session;
    }
  }
};
