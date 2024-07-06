import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  Fname: z.string().min(2).max(50),
  Lname: z.string().min(2).max(50),
  password: z.string().min(8),
  mobile: z.string().min(10).max(13),
});

function RegistrationComponent() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [submitable, setSubmitable] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Fname: '',
      Lname: '',
      password: '',
      mobile: '',
    },
  });

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const numberPattern = /^(^\+251|^251|^0)?(9|7)\d{8}$/;
    return numberPattern.test(phoneNumber);
  };

  const handlePhoneSubmit = async () => {
    if (validatePhoneNumber(phoneNumber)) {
      form.setValue('mobile', phoneNumber);
      setStep(2);
    } else {
    }
  };

  const handleFormSubmit = async (values: any) => {
    // Simulate sending data to backend and sending SMS
    setStep(3);
  };

  const handleCodeSubmit = () => {
    // Simulate verifying the code
    // On successful verification
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleResend = () => {
    // Handle resend logic here
  };

  return (
    <div className="lg:w-full w-[300px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
          {step === 1 && (
            <div className="h-[230px] bg-white border-2 w-[400px] p-4">
              <h1 className="text-2xl font-bold">Welcome, Let us get started</h1>
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pt-4">Mobile Number</FormLabel>
                    <FormControl>
                      <PhoneInput country={'et'} value={phoneNumber} onChange={handlePhoneChange} />
                    </FormControl>
                    <FormMessage>
                      {validatePhoneNumber(phoneNumber) ? 'Valid phone number' : 'Invalid phone number'}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <Button
                className="bg-blue-500 hover:bg-blue-700 items-end justify-end flex ml-[270px] mt-6"
                type="button"
                onClick={handlePhoneSubmit}
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="w-[460px] h-[390px] bg-white border-2 p-4">
              <h2 className="font-bold text-2xl flex justify-center">Create Account</h2>
              <div className="flex flex-row gap-3">
                <FormField
                  control={form.control}
                  name="Fname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mx-4">First Name</FormLabel>
                      <FormControl>
                        <Input className="w-[150px] bg-white ml-5" {...field} />
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
                      <FormLabel className="ml-5">Last Name</FormLabel>
                      <FormControl>
                        <Input className="bg-white w-[190px] mx-6" {...field} />
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
                    <FormLabel className="ml-4">New Password</FormLabel>
                    <FormControl>
                      <Input className="bg-white w-[390px] mx-5" type="password" {...field} />
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
                  Accept{' '}
                  <a href="https://www.muyalogy.com/content/terms" className="text-blue-500">
                    Terms of Service and privacy policy
                  </a>
                </label>
              </div>
              <div className="flex space-x-4 mt-4 gap-7">
                <Button
                  className="pt-4 rounded-none bg-white text-black hover:bg-slate-400 mx-2"
                  type="button"
                  onClick={handleBack}
                >
                  Change Mobile Number
                </Button>
                <Button className="bg-blue-500 mx-6" type="submit" disabled={!submitable}>
                  Register
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="w-[460px] h-[390px] bg-white border-2 p-4 rounded-lg shadow-lg">
              <h2 className="font-bold text-2xl flex justify-center">Confirm mobile</h2>
              <div className="flex flex-col gap-3 mt-4">
                <div className="text-sm flex my-7">
                  <p>
                    Muyalogy sent you a verification code to {phoneNumber}, Please enter your
                    verification code here
                  </p>
                </div>
                <div className="flex justify-center my-4">
                  <Input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={4}
                    className="w-1/2 p-2 border border-gray-300 rounded-md text-center"
                    placeholder="Code"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    className="w-1/3 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-black font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={handleResend}
                  >
                    Resend
                  </Button>
                  <Button
                    className="w-1/3 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleCodeSubmit}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

export default RegistrationComponent;
