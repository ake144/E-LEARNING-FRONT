import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaTelegramPlane, FaRegCopy } from 'react-icons/fa';

const ShareModal = ({ url, onClose }: { url: string; onClose: () => void }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Share</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <div className="flex justify-around mb-4">
          <FaFacebookF className="text-blue-600 text-2xl cursor-pointer" />
          <FaTwitter className="text-blue-400 text-2xl cursor-pointer" />
          <FaLinkedinIn className="text-blue-700 text-2xl cursor-pointer" />
          <FaTelegramPlane className="text-blue-500 text-2xl cursor-pointer" />
        </div>
        <div className="flex items-center border border-gray-300 rounded px-2 py-1">
          <input
            type="text"
            value={url}
            readOnly
            className="flex-grow focus:outline-none"
          />
          <button onClick={copyToClipboard} className="text-gray-500 hover:text-gray-800 ml-2">
            <FaRegCopy className="text-xl" />
          </button>
        </div>
        {isCopied && <p className="text-green-500 text-sm mt-2">Link copied to clipboard!</p>}
      </div>
    </div>
  );
};

export default ShareModal;
