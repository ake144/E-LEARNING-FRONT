import Link from 'next/link';
import React from 'react'
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { FaTelegram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { TbClockHour11 } from "react-icons/tb";







function Contact() {
  return (
    <div className='min-h-screen  mt-[90px] mx-[80px] font-sans text-black bg-white border'>
         <div className='lg:mx-[70px] h-full mx-7 border my-5 lg:p-4 p-2'>
                <div className='flex lg:flex-row flex-col'>
                    <div className=' flex gap-6 flex-col'>
                        <h2 className='text-2xl py-3 text-bold'>Contact Us</h2>
                        <div className='flex'>
                            <MdAlternateEmail  className='h-11 mt-1 w-[60px]  p-2 rounded-lg' />
                            <div className='ml-4'>
                            <h6 className='text-sm '>Email</h6>
                            <Link href='mailto:hi@muyalogy.com'>
                              <p className='text-azure text-sm'>hi@muyalogy.com</p>
                            </Link>
                            </div>
                        </div>
                        <div className='flex'>
                            <MdOutlinePhoneInTalk  className='h-11 mt-1 w-[60px] p-2 rounded-lg ' />
                            <div className='ml-4'>
                            <h6 className='text-sm '>Phone</h6>
                            <Link href='tel:+251904135555'>
                              <p className='text-azure text-sm'>+251904135555</p>
                            </Link>
                            </div>
                        </div>
                        <div className='flex'>
                        <FaTelegram   className='h-11 mt-1 w-[60px]  p-2 rounded-lg' />
                            <div className='ml-4'>
                            <h6 className='text-sm '>Telegram</h6>
                            <Link href='https://wa.me/qr/BUGMOAGAWA6YE1'>
                               <p className='text-azure text-sm'>+251904135555</p>
                            </Link>
                            </div>
                        </div>
                        <div className='flex'>
                        <FaWhatsapp  className='h-11 mt-1 w-[60px]  p-2 rounded-lg' />
                            <div className='ml-4'>
                            <h6 className='text-sm '>WhatsApp</h6>
                            <Link href='https://wa.me/qr/BUGMOAGAWA6YE1'>
                                <p className='text-azure text-sm'>+251904135555</p>
                            </Link>
                            </div>
                        </div>
                        <div className='flex'>
                        <CiLocationOn    className='h-11 mt-1 w-[60px]  p-2 rounded-lg' />
                            <div className='ml-4'>
                            <h6 className='text-sm '>Address</h6>
                            <p className='text-gray-600 text-sm'>Mambuk Building 7th floor, Gabon St, Addis Ababa, Ethiopia (Meskel Flower)</p>
                            </div>
                                                       
                    </div>
                    <div className='flex'>
                             <TbClockHour11   className='h-11 mt-1 w-[60px]  p-2 rounded-lg' />
                            <div className='ml-4'>
                            <h6 className='text-sm '>Office hours</h6>
                            <p className='text-gray-600 text-sm'>9 a.m – 5 p.m</p>
                            </div>
                        </div>  
                </div>
                <div className='flex my-5  px-3'>
                        <h2 className='text-3xl text-black items-center'>
                          Our  Location 
                            <iframe
                            width="450"
                            
                            height="250"
                            className='border-0 lg:w-[450px] w-[350px] h-[300px]'
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBctdx3bG9vW-3t3f5mRnxHRM0DJTpCEno&q=Mambuk+Building+7th+floor,Gabon+St,Addis+Ababa,Ethiopia"
                            allowFullScreen>
                        </iframe>

                        </h2>

                </div>
         </div>
     </div>

    </div>
  )
}

export default Contact

//AIzaSyBctdx3bG9vW-3t3f5mRnxHRM0DJTpCEno