import NextAuth, { SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInSchema } from '@/lib/zod';
import { User, JWT } from '@/next-auth.d';
import { BaseUrl } from '@/utils/types/identifiers';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const parsedCredentials = signInSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log("Credentials validation failed");
          return null;
        }

        try {
          const res = await fetch(`${BaseUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: parsedCredentials.data.email,
              password: parsedCredentials.data.password,
            }),
          });

          if (!res.ok) {
            console.log("Login request failed:", res.status, res.statusText);
            return null;
          }

          const user = await res.json();
          console.log("User authenticated:", user);

          return {
            id: user.id,
            email: user.email,
            username: user.username,
            Fname: user.Fname,
            Lname: user.Lname,
          };
        } catch (error) {
          console.log("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  
  session: {
    strategy: 'jwt' as SessionStrategy,
  },

  secret: process.env.JWT_SECRET || undefined,
  callbacks: {
    async jwt({ token, user }:{token: JWT, user: User | null}) {
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
          Fname: user.Fname,
          Lname: user.Lname,
        };
      }
      return token;
    },
    async session({ session, token }:{session: any, token: any}) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          username: token.username,
          Fname: token.Fname,
          Lname: token.Lname,
        };
      }
      return session;
    },
  },
};

export default authOptions;
