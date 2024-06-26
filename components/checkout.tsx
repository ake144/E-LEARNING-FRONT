// components/CheckoutForm.js
'use client';

import React, { useState } from 'react';

const CheckoutForm = ({ amount }:{amount: number}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div className="max-w-md mx-auto p-4 border rounded-md shadow-md">
      <form
        className="space-y-4"
        id="chapaForm"
        method="POST"
        action="https://api.chapa.co/v1/hosted/pay"
      >
        <input type="hidden" name="public_key" value="CHAPUBK_TEST-HBTcD2G9QDeoYV80E7OIk25PfW3fG0Kc" />
        <input type="hidden" name="tx_ref" value="unique-tx-ref-123456" />
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
        <input type="hidden" name="callback_url" value="https://example.com/callback" />
        <input type="hidden" name="return_url" value="https://example.com/return" />
        <input type="hidden" name="meta[title]" value="test" />

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value="Course Purchase"
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value="Full access to the course"
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
