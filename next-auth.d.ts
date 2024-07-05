// types/next-auth.d.ts

import { JWT as DefaultJWT } from 'next-auth/jwt';
import { DefaultSession, DefaultUser } from 'next-auth';

export interface User extends DefaultUser {
  id: string;
  username?: string;
  avatar?: string;
  Fname?: string;
  Lname?: string;
  accessToken?: string;
}

export interface Session extends DefaultSession {
  user: User;
}

export interface JWT extends DefaultJWT {
  id: string;
  username?: string;
  avatar?: string;
  Fname?: string;
  Lname?: string;
  accessToken?: string;
}
