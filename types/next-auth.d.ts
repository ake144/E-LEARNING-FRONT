// types/next-auth.d.ts
import { JWT as DefaultJWT } from 'next-auth/jwt';
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string;
    username?: string;
    avatar?: string;
    Fname?: string;
    Lname?: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    username?: string;
    avatar?: string;
    Fname?: string;
    Lname?: string;
  }
}
