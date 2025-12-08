
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

          // === SECURITY UPDATE: Single Session & Last Login ===
          // 1. Zwiększamy wersję tokena (wylogowuje inne sesje)
          // 2. Aktualizujemy datę ostatniego logowania
          const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
              tokenVersion: { increment: 1 }, // Zawsze +1 przy nowym logowaniu
              lastLogin: new Date()
            }
          });

          // Fetch active trainings and permissions
          const userTrainings = await prisma.userTraining.findMany({
            where: {
               userId: user.id,
               isActive: true,
               expiresAt: { gt: new Date() }
            },
            include: { training: true }
          });
          
          const allowedTrainings = userTrainings.map(ut => ut.training.slug);

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            isAdmin: user.isAdmin,
            role: user.role,
            firstName: user.firstName ?? undefined,
            lastName: user.lastName ?? undefined,
            companyName: user.companyName ?? undefined,
            tokenVersion: updatedUser.tokenVersion, // return NEW version
            allowedTrainings: allowedTrainings
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
    async jwt({ token, user, trigger }) {
      // 1. Initial Sign In
      if (user) {
        token.isAdmin = user.isAdmin;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.companyName = user.companyName;
        token.tokenVersion = user.tokenVersion; // Save version to token
        token.allowedTrainings = user.allowedTrainings;
      }

      // 2. Subsequent requests - Verify Token Version
      if (!user && token.sub) {
         // Pobieramy aktualną wersję z bazy, aby sprawdzić czy jest ważna
         const dbUser = await prisma.user.findUnique({
            where: { id: token.sub },
            select: { tokenVersion: true }
         });

         // JEŚLI wersja w bazie jest inna niż w tokenie -> WYLOGUJ (zwróć puste/zmienione)
         if (!dbUser || dbUser.tokenVersion !== token.tokenVersion) {
            console.log(`[AUTH_SECURITY] Session invalidated for user ${token.sub}. Token v:${token.tokenVersion}, DB v:${dbUser?.tokenVersion}`);
            // Force invalidation by returning strict subset or throwing error often causes loops, 
            // returning null here might break next-auth types depending on config.
            // Safest way in JWT strategy is often to return a flag or modified token that fails validation downstream if needed,
            // BUT standard NextAuth way: just return token, and client handles "unauthenticated".
            // However, modifying token to be "invalid" is better.
            return { ...token, error: "RefreshAccessTokenError" }; 
         }
      }

      return token;
    },
    async session({ session, token }) {
      // Jeśli token ma błąd logowania (np. inna wersja) - oznaczamy sesję jako error
      if (token.error === "RefreshAccessTokenError") {
         return { ...session, error: "RefreshAccessTokenError" } as any; 
      }

      if (session.user) {
        session.user.id = token.sub!;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.role = token.role as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.companyName = token.companyName as string;
        session.user.tokenVersion = token.tokenVersion as number;
        session.user.allowedTrainings = token.allowedTrainings as string[] || [];
      }
      return session;
    }
  }
};
