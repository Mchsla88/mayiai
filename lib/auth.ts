
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './db';

export const authOptions: NextAuthOptions = {
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

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            isAdmin: user.isAdmin,
            role: user.role,
            firstName: user.firstName ?? undefined,
            lastName: user.lastName ?? undefined,
            companyName: user.companyName ?? undefined,
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
      return true
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl) {
        return `${baseUrl}/dashboard`
      }
      if (url.startsWith("/")) return `${baseUrl}${url}`
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
      }
      return session;
    }
  }
};
