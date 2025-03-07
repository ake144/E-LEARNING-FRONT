"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpdateProfile } from '@/utils/quries/hooks';
import { User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from "@/components/ui/use-toast";
import { useSession } from 'next-auth/react';

export default function Profile() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { toast } = useToast();
  const userData = useSession()
  const user = userData.data?.user


  const { mutate: updateProfile, isPending: updatingProfile, isError: updateError, isSuccess: updateSuccess } = useUpdateProfile();

  
  const onSubmit = (data: any) => {
    updateProfile(data, {
      onSuccess: () => {
        toast({
          variant: "default",
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: error.message || "Failed to update profile.",
        });
      }
    });
  };

  // const user = {
  //   user: {
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     emailAddresses: [
  //       {
  //         emailAddress: 'exa@gmail.com',
  //         isPrimary: true,
  //       },
  //     ],
  //   },
  // };

  return (
    <div className="flex flex-col justify-center items-center mt-[50px] mx-4 sm:mx-[90px] p-4 sm:pt-5 gap-4">
      <h2 className="mt-10 border-b pb-2 w-full text-3xl font-semibold tracking-tight">
        My Profile
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
        <div className="flex flex-col sm:flex-row sm:gap-3">
          <div className="mb-4 mx-2 w-full">
            <label className="block text-gray-700 font-bold">First name</label>
            <input
              defaultValue={user?.Fname || ""}
              type="text"
              {...register("Fname", { required: true })}
              className="w-full p-2 border rounded mt-1"
            />
            {errors.Fname && <p className="text-red-500 text-sm mt-1">This field is required</p>}
          </div>
          <div className="mb-4 mx-2 w-full">
            <label className="block text-gray-700 font-bold">Last name</label>
            <input
              defaultValue={user?.Lname || ""}
              type="text"
              {...register("Lname", { required: true })}
              className="w-full p-2 border rounded mt-1"
            />
            {errors.Lname && <p className="text-red-500 text-sm mt-1">This field is required</p>}
          </div>
        </div>
        <div>
          <Label>Email</Label>
          <Input
            defaultValue={user?.email || ""}
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">This field is required</p>}
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-3">
          <div className="mb-4 mx-2 w-full">
            <label className="block text-gray-700 font-bold">Country</label>
            <input
              defaultValue="et"
              {...register("country")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div className="mb-4 mx-2 w-full">
            <label className="block text-gray-700 font-bold">City</label>
            <input
              {...register("city")}
              className="w-full p-2 border rounded mt-1"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">This field is required</p>}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-3">
          <div className="mb-4 mx-2 w-full">
            <label className="block text-gray-700 font-bold">Gender</label>
            <select
              className="w-full p-2 border rounded mt-1"
              {...register("gender", { required: true })}
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">This field is required</p>}
          </div>
          <div className="mb-4 mx-2 w-full">
            <label className="block text-gray-700 font-bold">Preferred language</label>
            <select
              className="w-full p-2 border rounded mt-1"
              {...register("preferredLanguage")}
            >
              <option value="">Select...</option>
              <option value="english">English</option>
              <option value="amharic">Amharic</option>
            </select>
          </div>
        </div>

        <div className="mb-4 mx-2 w-full">
          <label className="block text-gray-700 font-bold">Date of birth</label>
          <input
            className="w-full p-2 border rounded mt-1"
            type="date"
            {...register("dateOfBirth", { required: true })}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">This field is required</p>}
        </div>

        <div className="flex justify-center">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
