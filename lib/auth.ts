
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './db';

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
        console.log('[AUTH] authorize() called')
        console.log('[AUTH] credentials:', { email: credentials?.email, hasPassword: !!credentials?.password })
        
        if (!credentials?.email || !credentials?.password) {
          console.log('[AUTH] Missing credentials')
          return null;
        }

        console.log('[AUTH] Looking up user:', credentials.email)
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        console.log('[AUTH] User found:', !!user)
        if (!user || !user.password) {
          console.log('[AUTH] User not found or no password')
          return null;
        }

        console.log('[AUTH] Comparing password...')
        const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
        console.log('[AUTH] Password match:', passwordsMatch)

        if (!passwordsMatch) {
          console.log('[AUTH] Password mismatch!')
          return null;
        }

        console.log('[AUTH] Login successful! Returning user:', user.email)
        return {
          id: user.id,
          email: user.email,
          name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          firstName: user.firstName || undefined,
          lastName: user.lastName || undefined,
          companyName: user.companyName || undefined,
          isAdmin: user.isAdmin,
          role: user.role,
        };
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
