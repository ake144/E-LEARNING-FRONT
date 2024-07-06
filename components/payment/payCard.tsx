'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { BaseUrl, return_url } from '@/utils/types/identifiers';
import { Button } from '../ui/button';
import Link from 'next/link';

function PaymentPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [form, setForm] = useState({
    amount: '',
    currency: 'ETB', // Default currency
    email: user?.email || '',
    first_name: user?.Fname || '',
    last_name: user?.Lname || '',
    phone_number: '',
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('Form submitted');

    try {
      const response = await fetch(`${BaseUrl}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          tx_ref: `${form.first_name}-${Date.now()}`, // Generate a unique transaction reference
          redirect_url: { return_url }, // Replace with your actual return URL
          payment_options: 'card',
          customizations: {
            title: 'Payment for items in cart',
            description: "Middleout isn't free. Pay the price",
            logo: 'https://assets.piedpiper.com/logo.png',
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Error processing payment request');
      }

      const responseData = await response.json();
      console.log(responseData);

      // Redirect to checkout URL
      window.location.href = responseData.data.checkout_url;

      // Clear form after successful submission
      setForm({
        amount: '',
        currency: 'ETB',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
      });
    } catch (error) {
      console.error('Error', error);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-[150px] p-5 bg-white shadow-2xl rounded-xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          You need to be logged in to make a payment
        </h2>
        <Button>
          <Link href="/auth/signin">Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-[150px] p-5 bg-white shadow-2xl rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-6">Payment Form</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
          <label htmlFor="amount" className="font-medium text-gray-700">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="first_name" className="font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={form.first_name}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="last_name" className="font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="phone_number" className="font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={form.phone_number}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-6 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Pay
        </button>
      </form>
    </div>
  );
}

export default PaymentPage;
