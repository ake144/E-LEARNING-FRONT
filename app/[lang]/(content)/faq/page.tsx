'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

function FAQ() {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='min-h-screen bg-white lg:px-[40px] lg:mt-[100px] border mb-10 mt-[80px] lg:mx-[140px] mx-8 pt-[30px] px-7 text-sans'>
        <h2 className='lg:text-4xl text-xl 4xl justify-center items-center font-bold flex'>Frequently asked questions</h2>
         <div className='flex flex-col'>
         <div className='border rounded-md p-4 mt-5'>
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">What is Muyalogy?</h2>
                <Button onClick={() => { setIsOpen(!isOpen) }}>
                  {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </Button>
              </div>
              {isOpen && (
                <div className="mt-2 mx-2">
                  <p className=" text-base cursor-pointer">
                    <span className="font-bold">Muyalogy</span> is an innovative full-service learning platform that produces, markets and manages online courses in a variety of fields.
                     The name Muyalogy is a combination of two words – Muya, which means skill in Amharic, and logy, which means study in Greek. and our platform has currently started registration for the various courses that we are providing. Muyalogy is a place where anyone can learn a new skill.
                  </p>
                </div>
              )}
            </div>

         </div>


    </div>
  )
}

export default FAQ