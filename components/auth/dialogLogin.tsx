'use client';

import { signIn } from 'next-auth/react';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInSchema } from "@/lib/zod";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function DialogLogin() {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<SignInSchema>({
      resolver: zodResolver(signInSchema)
    });
  
    const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
      });
  
        if (result?.error) {
          notifyError(result.error);
        } else {
          notifySuccess('Sign in successful!');
          router.push('/'); // Redirect to homepage or another page
        }
      } catch (error) {
        notifyError('An unexpected error occurred.');
        console.error('Sign in error:', error);
      }
    };
  
    const notifySuccess = (message: string) => {
      toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        transition: Slide,
      });
    };
  
    const notifyError = (message: string) => {
      toast.error(message, {
        position: 'top-right',
        autoClose: 5000,
        transition: Slide,
      });
    };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} >
         <div className="h-[350px] bg-white border-2 w-[400px] p-4">
         <h1 className="text-2xl mb-7 font-bold">Welcome Back, Please Sign In</h1>
         <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" {...register("email")} className="w-full p-2 border rounded mt-1" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input type="password" {...register("password")} className="w-full p-2 border rounded mt-1" />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
          Sign In
        </button>
             

         </div>

      </form>
    </div>
  )
}

export default DialogLogin