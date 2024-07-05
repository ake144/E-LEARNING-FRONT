'use client'

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema, signUpSchema } from '@/lib/zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { BaseUrl } from '@/utils/types/identifiers';

interface SignUpData {
  email: string;
  password: string;
  username?: string;
  Fname?: string;
  Lname?: string;
}

const signUp = async (data: SignUpData): Promise<any> => {
  const res = await fetch(`${BaseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
});
  if (!res.ok) {
    throw new Error('Failed to create user');
  }
  return res.json();
};

function DialogSignUp() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation<any, Error, SignUpData>({ mutationFn: signUp, 
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'User created successfully',
        description: 'You have successfully signed up.',
      });
      router.push('/auth/signin');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Sign up failed',
        description: 'An unexpected error occurred.',
      });
    },
  });

  const onSubmit: SubmitHandler<SignUpData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl mb-6 font-bold">Welcome, Let us get started</h1>
      <div className="flex flex-row gap-3">
        <div className="mb-4">
          <label className="block text-gray-700">First name</label>
          <input type="text" {...register('Fname')} className="w-full p-2 border rounded mt-1" />
          {errors.Fname && <p className="text-red-500 text-sm mt-1">{errors.Fname.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last name</label>
          <input type="text" {...register('Lname')} className="w-full p-2 border rounded mt-1" />
          {errors.Lname && <p className="text-red-500 text-sm mt-1">{errors.Lname.message}</p>}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input type="email" {...register('email')} className="w-full p-2 border rounded mt-1" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input type="password" {...register('password')} className="w-full p-2 border rounded mt-1" />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
        Sign Up
      </button>
    </form>
  );
}

export default DialogSignUp;
