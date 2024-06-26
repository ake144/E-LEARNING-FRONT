'use client';

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";


const formSchema = z.object({
  Fname: z.string().min(2).max(50),
  Lname: z.string().min(2).max(50),
  password: z.string().min(8),
  mobile: z.string().min(10).max(10),
});

function AuthForm() {
  const [step, setStep] = useState(1);
  const [submitable, setSubmitable] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [validPhone, setValidPhone] = useState(false);
  const [code, setCode] = useState('');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Fname: "",
      Lname: "",
      password: "",
      mobile: "",
    },
  });

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleResend = () => {
    // Handle resend logic here
  };

  const handleSubmit = () => {
    // Handle submit logic here
  };

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    setValidPhone(validatePhoneNumber(value));
    
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    // Ensure the phone number is exactly 13 digits long with the country code
    // const ethiopianPhoneNumberPattern = /^\+251\d{9}$/;
     const numberPattern =  /^(^\+251|^251|^0)?(9|7)\d{8}$/;
    
    console.log("pn",numberPattern.test(phoneNumber), phoneNumber)
    return numberPattern.test(phoneNumber);
  };

  const handlePhoneSubmit = () => {
    console.log(validatePhoneNumber(phoneNumber))

    if (validatePhoneNumber(phoneNumber)) {
      setStep(2);
      form.setValue('mobile', phoneNumber);
    } else {
      console.log('Invalid phone number');
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleFormSubmit = async (values: any) => {
    // Simulate sending data to backend and sending SMS
    console.log('Submitting registration data', values);
    setStep(3);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        {step === 1 && (
          <div className='h-[230px] bg-white border-2 w-[400px] p-4'>
            <h1 className="text-2xl font-bold">Welcome, Let us get started</h1>
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='pt-4'>Mobile Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      country={'et'}
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                    />
                  </FormControl>
                  <FormMessage>
                    {validPhone ? 'Valid phone number' : 'Invalid phone number'}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button
              className='bg-blue-500 hover:bg-blue-700 items-end justify-end flex ml-[270px] mt-6'
              type='button'
              onClick={handlePhoneSubmit}
            >
              Continue
            </Button>
          </div>
        )}
        {step === 2 && (
          <div className='w-[460px] h-[390px] bg-white border-2 p-4'>
            <h2 className='font-bold text-2xl flex justify-center'>Create Account</h2>
            <div className='flex flex-row gap-3'>
              <FormField
                control={form.control}
                name="Fname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='mx-4'>First Name</FormLabel>
                    <FormControl>
                      <Input className='w-[150px] bg-white ml-5' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Lname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='ml-5'>Last Name</FormLabel>
                    <FormControl>
                      <Input className='bg-white w-[190px] mx-6' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='ml-4'>New Password</FormLabel>
                  <FormControl>
                    <Input className='bg-white w-[390px] mx-5' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center mx-5 pt-6 space-x-2">
              <Checkbox onClick={() => setSubmitable(!submitable)} id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept <a href='https://www.muyalogy.com/content/terms' className='text-blue-500'> Terms of Service and privacy policy</a>
              </label>
            </div>
            <div className="flex space-x-4 mt-4 gap-7">
              <Button className='pt-4 rounded-none bg-white text-black hover:bg-slate-400 mx-2' type='button' onClick={handleBack}><IoIosArrowRoundBack /> Change Mobile Number</Button>
              <Button
                className=' bg-blue-500  mx-6'
                type="button"
                onClick={() => setStep(3)}
                disabled={!submitable}
              >
                Continue
              </Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="w-[460px] h-[390px] bg-white border-2 p-4 rounded-lg shadow-lg">
            <h2 className="font-bold text-2xl flex justify-center">Confirm mobile</h2>
            <div className="flex flex-col gap-3 mt-4">
              <div className="text-sm flex my-7">
                <p>Muyalogy sent you a verification code to {phoneNumber}, Please enter your verification code and new password here</p>
              </div>
              <div className="flex justify-center my-4">
                <input
                  type="text"
                  value={code}
                  onChange={handleCodeChange}
                  maxLength={4}
                  className="w-1/2 p-2 border border-gray-300 rounded-md text-center"
                  placeholder="Code"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleResend}
                  className="w-1/3 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-black font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Resend
                </button>
                <button
                  onClick={handleSubmit}
                  className="w-1/3 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}

export default AuthForm;
