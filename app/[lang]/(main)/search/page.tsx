'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { AiTwotonePlayCircle } from "react-icons/ai";
import { LuBarChart } from "react-icons/lu";
import { FiAlignRight } from "react-icons/fi";
import { MdOutlineTimer } from "react-icons/md";
import Link from 'next/link';
// Adjust path as per your project structure
import { courseSchema } from '@/types/course';
import { useAllCourses } from '@/utils/hooks/getCourse';


const SearchPage = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get('query') || '';
  const [searchResults, setSearchResults] = useState<courseSchema[]>([]);
  const { data, isLoading, isError } = useAllCourses();

  useEffect(() => {
    if (q && data) {
      const results = data.filter(item => item.title.toLowerCase().includes(q.toLowerCase()));
      setSearchResults(results);
    } else {
      setSearchResults([]); 
    }
  }, [q, data]);

  // if (isLoading) {
  //   return <div className='mt-[200px] mx-[100px] flex items-center justify-center'>Loading...</div>;
  // }

  // if (isError || !data) {
  //   return <div  className='mt-[200px] mx-[100px] flex items-center justify-center'>Error fetching courses</div>;
  // }

  return (
    <div className='min-h-screen mx-10 mt-[100px] mb-8   lg:ml-11'>
      <h1 className='text-2xl font-bold my-10 lg:ml-[60px]'>Search Results for "{q}" ({searchResults.length})</h1>
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:ml-[60px]'>
        {searchResults.map((result, index) => {
          const slug = result.title.toLowerCase().replace(/\s+/g, '-');
          return (
            <div key={index} className='bg-white border border-gray-200 rounded-lg shadow-md w-full'>
              <div className='relative'>
                <Image
                  src={result.image_url} // Adjust as per your actual image data
                  alt="Course Thumbnail"
                  width={700}
                  height={280}
                  className='rounded-t-lg'
                />
                <div className='absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold'>
                  BEST SELLER
                </div>
                <div className='absolute inset-0 flex justify-center items-center'>
                  <AiTwotonePlayCircle className='h-16 w-16 text-white opacity-75' />
                </div>
              </div>
              <div className='p-4'>
              <Link href={`/courses/${slug}-${result.id}`}>
                  <h2 className='text-lg font-bold cursor-pointer'>{result.title}</h2>
                </Link>
                <p className='text-gray-600 text-xs mt-2 mb-4'>A course by: {result.user_id}</p>
                <p className="text-gray-500 mb-4 text-sm">{JSON.parse(result.content).about}</p>
                <div className='flex border-y pb-5 pt-5 border-gray-900 justify-between items-center text-gray-600 text-sm'>
                  <div className='flex flex-col items-start'>
                    <div className='flex items-center mb-1'>
                      <LuBarChart />
                      <span>Level</span>
                    </div>
                    <p className='font-bold'>{result.level}</p>
                  </div>
                  <div className='flex flex-col items-start mr-1 ml-1'>
                    <div className='flex items-center mb-1'>
                      <MdOutlineTimer />
                      <span className='ml-1'>Duration</span>
                    </div>
                    <p className='ml-1 font-bold'>{result.duration}</p>
                  </div>
                  <div className='flex flex-col items-start'>
                    <div className='flex items-center mb-1'>
                      <FiAlignRight />
                      <span className='ml-1'>Lessons</span>
                    </div>
                    <p className='ml-1 font-bold'>32</p>
                  </div>
                </div>
                <Link href={`/courses/${slug}-${result.id}`}>
                  <button className='w-full mt-4 text-blue-500 border border-blue-600 py-2 px-4 rounded'>Get started</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <h1 className='text-2xl font-bold my-10 lg:ml-[70px]'>Recommended Courses</h1>
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:ml-[60px]'>
        {data?.map((result, index) => {
            const slug = result.title.toLowerCase().replace(/\s+/g, '-');
            return (
          <div key={index} className='bg-white border border-gray-200 rounded-lg shadow-md w-full'>
            <div className='relative'>
              <Image
                src={result.image_url} // Adjust as per your actual image data
                alt="Course Thumbnail"
                width={700}
                height={280}
                className='rounded-t-lg'
              />
              <div className='absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold'>
                BEST SELLER
              </div>
              <div className='absolute inset-0 flex justify-center items-center'>
                <AiTwotonePlayCircle className='h-16 w-16 text-white opacity-75' />
              </div>
            </div>
            <div className='p-4'>
                <Link href={`/courses/${slug}-${result.id}`}>
              <h2 className='text-lg font-bold'>{result.title}</h2>
                 </Link>
              <p className='text-gray-600 text-xs mt-2 mb-4'>A course by: {result.user_id}</p>
              <p className="text-gray-500 mb-4 text-sm">{JSON.parse(result.content).about}</p>
              <div className='flex border-y pb-5 pt-5 border-gray-900 justify-between items-center text-gray-600 text-sm'>
                <div className='flex flex-col items-start'>
                  <div className='flex items-center mb-1'>
                    <LuBarChart />
                    <span>Level</span>
                  </div>
                  <p className='font-bold'>{result.level}</p>
                </div>
                <div className='flex flex-col items-start mr-1 ml-1'>
                  <div className='flex items-center mb-1'>
                    <MdOutlineTimer />
                    <span className='ml-1'>Duration</span>
                  </div>
                  <p className='ml-1 font-bold'>{result.duration}</p>
                </div>
                <div className='flex flex-col items-start'>
                  <div className='flex items-center mb-1'>
                    <FiAlignRight />
                    <span className='ml-1'>Lessons</span>
                  </div>
                  <p className='ml-1 font-bold'>32</p>
                </div>
              </div>
              <Link href={`/courses/${slug}-${result.id}`}>
                   <button className='w-full mt-4 text-blue-500 border border-blue-600 py-2 px-4 rounded'>Get started</button>
               </Link>
            </div>
          </div>
         );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
