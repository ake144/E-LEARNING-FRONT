'use client'


import React, { useState } from 'react';

function PaymentPage() {
  const [form, setForm] = useState({
    amount: '',
    currency: 'ETB', // Default currency
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
  });

  const handleChange = (e:any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/accept-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          tx_ref: `${form.first_name}-${Date.now()}`, // Generate a unique transaction reference
          redirect_url: "http://localhost:3000/pay/sucess", // Replace with your actual return URL
          payment_options: "card",
          customizations: {
            title: "Payment for items in cart",
            description: "Middleout isn't free. Pay the price",
            logo: "https://assets.piedpiper.com/logo.png",
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
        amount: "",
        currency: "ETB",
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
      });
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="flex items-center mt-[200px] mx-[80px] justify-center">
      <form className="p-5 m-10 shadow-2xl rounded-xl" onSubmit={handleSubmit}>
        <input
          type="text"
          name="amount"
          className='mx-5'
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <button className="px-4 py-2 ml-3 rounded-md bg-green-600 text-white" type="submit">
          Pay
        </button>
      </form>
    </div>
  );
}

export default PaymentPage;
