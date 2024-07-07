'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { AiTwotonePlayCircle } from 'react-icons/ai';
import { LuBarChart } from 'react-icons/lu';
import { MdOutlineTimer } from 'react-icons/md';
import { FiAlignRight } from 'react-icons/fi';
import Link from 'next/link';
import MyCourse from '@/components/courses/myCourse';
import { BaseUrl } from '@/utils/types/identifiers';
import { isCoursePurchased } from '@/utils/check';


function MyCourses() {
  const { data: session, status } = useSession();
  const [course, setCourse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userId = session?.user?.id;



  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`${BaseUrl}/course/purchased/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log("purchased",result);
        setIsLoading(false);
        setCourse(result);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchData();
  }, [userId]);



  return (
    <div>
      <div className='mt-[90px] mx-[50px]'>
      <h1 className='text-4xl items-center justify-center mb-4 font-bold text-gray-800'>My Courses</h1>
      
      
      {error && <p className='text-gray-500 flex items-center justify-center mb-5'>An error occurred while fetching your courses</p>}
  {isLoading && <p className='text-gray-500 flex items-center mt-[140px] justify-center mb-5'>Loading...</p>}

 {course?.length == 0 && <p className='text-xl  justify-center items-center  mt-11'>You have no purchased course</p>}
      {course?.length && (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full pb-8 px-4 sm:px-0 font-sans">
          {course?.map((course:any) => {
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
                  <Link href={`/my-courses/${slug}-${course.id}`}>
                    <h2 className="text-lg font-</Link>bold cursor-pointer">{course.title}</h2>
                  </Link>
                  <p className="text-gray-600 text-xs mt-2 mb-4">A course by : {course.user_id}</p>
                  <p className="text-gray-500 mb-4 text-sm">{JSON.parse(course.content).about}</p>
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
                  <Link href={`/my-courses/${slug}-${course.id}`}>
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

      </div>
    </div>
  );
}

export default MyCourses