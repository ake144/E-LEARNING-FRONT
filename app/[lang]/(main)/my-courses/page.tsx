'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { AiTwotonePlayCircle } from 'react-icons/ai';
import { LuBarChart } from 'react-icons/lu';
import { MdOutlineTimer } from 'react-icons/md';
import { FiAlignRight } from 'react-icons/fi';
import Link from 'next/link';
import { BaseUrl } from '@/utils/types/identifiers';

export default function Component() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
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
        setIsLoading(false);
        setCourses(result);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="min-h-screen mt-[90px] mx-[50px]' bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">My Courses</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500">
                 Loading...

            </div>
          </div>
        )}

        {!isLoading && courses.length === 0 && (
          <p className="text-xl text-gray-600 text-center mt-[200px] mx-[100px]">You have no purchased courses</p>
        )}

        {courses.length > 0 && (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course: any) => {
              const slug = course.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="relative">
                    <Image
                      src={course.image_url}
                      alt="Course Thumbnail"
                      width={700}
                      height={280}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                      BEST SELLER
                    </div>
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <AiTwotonePlayCircle className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <Link href={`/my-courses/${slug}-${course.id}`}>
                      <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-300">{course.title}</h2>
                    </Link>
                    <p className="text-gray-600 text-sm mb-4">A course by: {course.user_id}</p>
                    <p className="text-gray-700 mb-6 text-sm line-clamp-3">{JSON.parse(course.content).about}</p>
                    <div className="flex justify-between items-center text-gray-600 text-sm border-t border-gray-200 pt-4">
                      <div className="flex items-center">
                        <LuBarChart className="mr-1" />
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center">
                        <MdOutlineTimer className="mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <FiAlignRight className="mr-1" />
                        <span>36 Lessons</span>
                      </div>
                    </div>
                    <Link href={`/my-courses/${slug}-${course.id}`}>
                      <button className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
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