// lib/zod.ts
import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export type SignInSchema = z.infer<typeof signInSchema>;


export const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 6 characters long" }),
  username: z.string().min(2, { message: "Username must be at least 2 characters long" }).optional(),
  Fname: z.string().min(2, { message: "First name must be at least 2 characters long" }).optional(),
  Lname: z.string().min(2, { message: "Last name must be at least 2 characters long" }).optional(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;


export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string().optional(), // Optional fields
  avatar: z.string().url().optional(),
  Fname: z.string().optional(),
  Lname: z.string().optional(),
});



export type UserSchema  = z.infer<typeof userSchema>;
       