'use client'

import React from 'react';
import Image from 'next/image';
import { AiTwotonePlayCircle } from "react-icons/ai";
import { LuBarChart } from "react-icons/lu";
import { FiAlignRight } from "react-icons/fi";
import { MdOutlineTimer } from "react-icons/md";
import { FaRegFaceSadTear } from 'react-icons/fa6';
import Link from 'next/link';
import { courseSchema } from '@/types/course';
import { useAllCourses } from '@/utils/hooks/getCourse';



function Cards() {
  const { data: courses = [], isLoading, isError, error } = useAllCourses();


  if (isLoading) {  
    return (
      <div className="flex items-center justify-center mt-[200px] mx-[100px]">
        <FaRegFaceSadTear className="w-10 h-10 mr-2" />
        <p>Loading...</p>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="flex items-center justify-center mt-[200px] mx-[100px]">
        <FaRegFaceSadTear className="w-10 h-10 mr-2" />
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      {courses?.length && (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full pb-8 px-4 sm:px-0 font-sans">
          {courses.map((course) => {
            const slug = course.title.toLowerCase().replace(/\s+/g, '-');
            return (
              <div key={course.id} className="bg-white border w-full border-gray-200 rounded-lg shadow-md">
                <div className="relative">
                  <Image
                    src={course.image_url}
                    alt="Course Thumbnail"
                    width={700}
                    height={280}
                    className="rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                    BEST SELLER
                  </div>
                  <div className="absolute inset-0 flex justify-center items-center">
                    <AiTwotonePlayCircle className="h-16 w-16 text-white opacity-75" />
                  </div>
                </div>
                <div className="p-4">
                  <Link href={`/courses/${slug}-${course.id}`}>
                    <h2 className="text-lg font-bold cursor-pointer">{course.title}</h2>
                  </Link>
                  <p className="text-gray-600 text-xs mt-2 mb-4">A course by: {course.user_id}</p>
                     {typeof course.content === 'string' ? JSON.parse(course.content).about : ''}
                  {/* Display Price */}
                  <p className="text-green-600 font-bold text-lg mb-4">
                    {course.price ? `$${course.price}` : 'Free'}
                  </p>
                  
                  <div className="flex border-y pb-5 pt-5 border-gray-900 justify-between items-center text-gray-600 text-sm">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center mb-1">
                        <LuBarChart />
                        <span className="ml-1">Level</span>
                      </div>
                      <p className="font-bold">{course.level}</p>
                    </div>
                    <div className="flex flex-col items-start mr-1 ml-1">
                      <div className="flex items-center mb-1">
                        <MdOutlineTimer />
                        <span className="ml-1">Duration</span>
                      </div>
                      <p className="ml-1 font-bold">{course.duration}</p>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="flex items-center mb-1 ml-1">
                        <FiAlignRight />
                        <span className="ml-1">Lessons</span>
                      </div>
                      <p className="ml-1 font-bold">36</p>
                    </div>
                  </div>
                  <Link href={`/courses/${slug}-${course.id}`}>
                    <button className="w-full mt-4 text-blue-500 border border-blue-600 py-2 px-4 rounded">
                      Get started
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Cards;
