// components/PurchaseCard.js
'use client';
import React, { useState, useEffect } from 'react';

const PurchaseCard = ({ amount }: {amount: number}) => {
  const [email, setEmail] = useState('exa@example.com');
  const [firstName, setFirstName] = useState('Lee');
  const [lastName, setLastName] = useState('Doe');
  const [referralCode, setReferralCode] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(4 * 60 * 60 + 50 * 60 + 14); // 4 hours, 50 minutes, 14 seconds
  const [isOPen, setIsOpen] = useState(false);


  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}s`;
  };

  const handleBuyNowClick = () => {
    if (isConfirmed) {
      const form = document.getElementById('chapaForm') as HTMLFormElement;
      form.submit();
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Buy this course</h2>
      <div className="text-lg font-bold mb-4">
        Price: {amount} ETB
      </div>
      <div className="mb-4">
        <label className="block text-gray-700"> <a className='text-azure' onClick={()=>{setIsOpen(true)}}>Referral Code(Optional)</a></label>
        {isOPen && ( <input
          type="text"
          required={false}
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          className="mt-1 cursor-pointer block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500"
        />) }
      </div>
      <div className="mb-4 flex items-start">
        <input
          type="checkbox"
          checked={isConfirmed}
          onChange={() => setIsConfirmed(!isConfirmed)}
          className="mt-1 mr-2"
        />
        <label className="text-sm text-gray-700">
          Please confirm that your account has sufficient balance, including for the necessary transaction fee.
          <br />
          Click the check box to continue and then pay.
        </label>
      </div>
      <button
        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={!isConfirmed}
        onClick={handleBuyNowClick}
      >
        Buy Now
      </button>
      <div className="mt-4 text-red-500 text-sm">
        This offer ends in {formatTime(timeLeft)}
      </div>
      <div className="mt-2 text-sm text-gray-500">
        If you have payment issues, please <a href="#" className="text-blue-500 underline">Contact us</a>
      </div>

      {/* Hidden form to submit to Chapa */}
      <form
        className="space-y-4"
        id="chapaForm"
        method="POST"
        action="https://checkout.chapa.co/checkout/payment/3cU1t1Q1G85kP5cW44wxtHcdnij7A9r964qflhHJbrhymQ"
      >
        <input type="hidden" name="public_key" value="CHAPUBK_TEST-HBTcD2G9QDeoYV80E7OIk25PfW3fG0Kc" />
        <input type="hidden" name="tx_ref" value="unique-tx-ref-123456789" />
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="first_name" value={firstName} />
        <input type="hidden" name="last_name" value={lastName} />
        <input type="hidden" name="title" value="Course Purchase" />
        <input type="hidden" name="description" value="Full access to the course" />
        <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
        <input type="hidden" name="callback_url" value="https://example.com/callback" />
        <input type="hidden" name="return_url" value="https://example.com/return" />
        <input type="hidden" name="meta[title]" value="test" />
      </form>
    </div>
  );
};

export default PurchaseCard;
