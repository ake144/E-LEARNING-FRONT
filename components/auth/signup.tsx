'use client'


import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, signUpSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const SignUp = () => {
    const { toast } = useToast();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema)
    });

    const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
        try {
            const res = await fetch('http://localhost:4000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                toast({
                    variant: "default",
                    title: 'User created successfully',
                    description: 'You have successfully signed up.',
                });
                router.push('/auth/signin'); // Redirect to login page after successful registration
            } else {
                toast({
                    variant: "destructive",
                    title: "Sign up failed",
                    description: "An unexpected error occurred.",
                });
            }
        } catch (error) {
            console.error('Error creating user:', error);
            toast({
                variant: "destructive",
                title: "Sign up failed",
                description: "An unexpected error occurred.",
            });
        }
    };

    return (
        <div className="flex justify-center mb-5 mt-3 pt-3">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-[400px]">
                <h1 className="text-2xl font-bold mb-7 text-center">Sign Up</h1>
                <div className="mb-4">
                    <label className="block text-gray-700">First Name</label>
                    <input type="text" {...register("Fname")} className="w-full p-2 border rounded mt-1" />
                    {errors.Fname && <p className="text-red-500 text-sm mt-1">{errors.Fname.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Last Name</label>
                    <input type="text" {...register("Lname")} className="w-full p-2 border rounded mt-1" />
                    {errors.Lname && <p className="text-red-500 text-sm mt-1">{errors.Lname.message}</p>}
                </div>
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
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
