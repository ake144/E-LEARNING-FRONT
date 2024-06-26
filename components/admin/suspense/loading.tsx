'use client'

import { motion } from 'framer-motion';
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const loadingText = ['L', 'O', 'A', 'D', 'I', 'N', 'G'];

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-white text-4xl space-x-4">
        {loadingText.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.5, duration: 0.5, repeat: Infinity,repeatType:'reverse', repeatDelay: 1.5}}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}


      </div>
    </div>
  );
};

export default LoadingScreen;
