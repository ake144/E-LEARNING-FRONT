import React from 'react';
import { MdLanguage, MdOutlineTimer } from "react-icons/md";
import { CiShare2 } from "react-icons/ci";
import { RiGraduationCapLine } from "react-icons/ri";

function AboveFooter() {
  return (
    <div className='bg-white w-full p-6 font-sans'>
      <h1 className='text-center pt-12 pb-6 lg:text-4xl text-2xl font-bold'>
        What to expect from <span className='text-blue-600'>Bright Path</span> courses
      </h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 px-2 lg:px-24'>
        <div className='flex flex-col gap-9'>
          <div className='flex'>
            <RiGraduationCapLine className='h-11 mt-3 w-[60px] bg-blue-500 p-2 rounded-lg text-white' />
            <div className='ml-4'>
              <h6 className='text-lg font-bold'>Learn from the best professionals</h6>
              <p className='text-gray-600 text-sm'>Learn valuable methods and techniques explained by top experts in the creative sector.</p>
            </div>
          </div>
          <div className='flex'>
            <MdOutlineTimer className='h-11 mt-3 w-[60px] bg-blue-500 p-2 rounded-lg text-white' />
            <div className='ml-4'>
              <h6 className='text-lg font-bold'>Learn at your own pace</h6>
              <p className='text-gray-600 text-sm'>Enjoy learning from home without a set schedule and with an easy-to-follow method. You set your own pace.</p>
            </div>
          </div>
          <div className='flex'>
            <CiShare2 className='h-11 mt-3 w-[60px] bg-blue-500 p-2 rounded-lg text-white' />
            <div className='ml-4'>
              <h6 className='text-lg font-bold'>Watch professionally produced courses</h6>
              <p className='text-gray-600 text-sm'>We curate our teacher roster and produce every course in-house to ensure a high-quality online learning experience.</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-9'>
          <div className='flex'>
            <MdLanguage className='h-11 mt-3 w-[60px] bg-blue-500 p-2 rounded-lg text-white' />
            <div className='ml-4'>
              <h6 className='text-lg font-bold'>Learn without language barrier</h6>
              <p className='text-gray-600 text-sm'>Get lifetime access to courses in different languages and subtitles.</p>
            </div>
          </div>
          <div className='flex'>
            <RiGraduationCapLine className='h-11 mt-3 w-[60px] bg-blue-500 p-2 rounded-lg text-white' />
            <div className='ml-4'>
              <h6 className='text-lg font-bold'>Meet expert teachers</h6>
              <p className='text-gray-600 text-sm'>Each expert teaches what they do best, with clear guidelines, true passion, and professional insight in every lesson.</p>
            </div>
          </div>
          <div className='flex'>
            <CiShare2 className='h-11 mt-3 w-[60px] bg-blue-500 p-2 rounded-lg text-white' />
            <div className='ml-4'>
              <h6 className='text-lg font-bold'>Earn a completion certificate with every course</h6>
              <p className='text-gray-600 text-sm'>Get a custom certificate signed by your teacher for every course. Share it on your portfolio, social media, or elsewhere.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboveFooter;
