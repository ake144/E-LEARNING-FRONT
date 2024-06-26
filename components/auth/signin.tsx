'use client'

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, signInSchema } from "@/lib/zod";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const Login = () => {
    const { toast } = useToast();
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
                toast({
                    variant: "destructive",
                    title: "Sign in failed",
                    description: result.error,
                });
            } else {
                toast({
                    variant: "default",
                    title: "Sign in successful",
                    description: "You have successfully signed in.",
                });
                router.push('/');
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Sign in failed",
                description: "An unexpected error occurred.",
            });
            console.error('Sign in error:', error);
        }
    };

    return (
        <div className="flex justify-center my-11">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-[400px]">
                <h1 className="text-2xl pb-4 font-bold mb-4 text-center">Login</h1>
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
            </form>
        </div>
    );
};

export default Login;
