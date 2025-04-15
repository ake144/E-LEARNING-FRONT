import NextAuth, { SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInSchema } from '@/lib/zod';
import { User, JWT } from '@/next-auth.d';
import { BaseUrl } from '@/utils/types/identifiers';
import { encode } from 'next-auth/jwt';

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
            return null;
          }

          const user = await res.json();

          return {
            id: user.id,
            email: user.email,
            username: user.username,
            Fname: user.first_name,
            Lname: user.last_name,
            accssesToken: user.accessToken,
          };
        } catch (error) {
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
    maxAge: 30 * 24 * 60 * 60,

  
  
    
  
  },

  secret: process.env.JWT_SECRET ,

  

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
      console.log("JWT token:", token);
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
      console.log("Session:", session);
      return session;
    },
  },
};

export default authOptions;
