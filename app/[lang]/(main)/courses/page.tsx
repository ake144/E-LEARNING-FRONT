'use client'


import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // Corrected import path for useSearchParams
import Image from 'next/image';
import { AiTwotonePlayCircle } from 'react-icons/ai';
import { LuBarChart } from 'react-icons/lu';
import { FiAlignRight } from 'react-icons/fi';
import { MdOutlineTimer } from 'react-icons/md';
import { FaRegSadTear } from 'react-icons/fa'; // Corrected import for FaRegSadTear
import { UseGetAllCategories } from '@/utils/quries/hooks'; // Adjusted path as per your project structure
import { useAllCourses } from '@/utils/hooks/getCourse';

import { Separator } from '@radix-ui/react-separator';
import { categorySchema, courseSchema } from '@/types/course';

const CoursesPage: React.FC = () => {
  const params = useSearchParams();
  const category_id = params.get('cat_id');
  const { data: courses, isLoading, isError } = useAllCourses();
  const [filteredCourses, setFilteredCourses] = useState<courseSchema[]>([]);

  const formatCategoryName = (name: string) => {
    const firstWord = name.split(' ')[0];
    return encodeURIComponent(firstWord); // Encodes the first word to be URL safe
  };



  useEffect(() => {
    if (category_id && courses) {
      const filtered = courses.filter(course => String(course.category_id) === category_id)

      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses || []); 
    }
  }, [category_id, courses]);


  // useEffect(() => {
  //   if (category) {
  //     const filtered = data.courses.filter(course => course.category === category);
  //     setFilteredCourses(filtered);
  //   } else {
  //     setFilteredCourses(data.courses || []); 
  //   }
  // }, [category, data]);

  const { data: categories } = UseGetAllCategories(); 


  const categoryName = categories?.find(cat => cat.id === Number(category_id))?.name || '';

  if (isLoading) {
    return <div  className='mt-[200px] mx-[100px] flex items-center justify-center'>
          <p className='text-xl justify-center items-center mx-10 mt-10'>
            isLoading...
          </p>

    </div>;
  }

  if (isError || !courses) {
    return <div className='mt-[200px] mx-[100px] flex items-center justify-center'>Error fetching courses</div>;
  }

  return (
    <div className="flex mt-[90px] font-sans"> {/* Adjusted margin top value */}
      <div className="w-1/4 ml-7 lg:ml-[80px] p-4"> {/* Adjusted left margin for smaller screens */}
        <h2 className="text-md mt-4">CATEGORIES</h2>
        <div className="mb-4">
          <ul>
            <li className={`cursor-pointer py-2 ${!category_id ? 'text-blue-500 font-bold' : ''}`}>
              <Link href="/courses">
                <p className="text-sm lg:text-md">All Courses</p>
              </Link>
            </li>
            {categories?.map((cat: categorySchema) => (
              <li key={cat.id} className={`cursor-pointer py-2 ${Number(category_id) === cat.id ? 'text-blue-500 font-bold' : ''}`}>
               <Link href={`/courses/?category=${formatCategoryName(cat.name)}&cat_id=${cat.id}`}>
                  <p className="text-sm lg:text-md">{cat.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-3/4 p-4">
      <h2 className="text-xl font-bold mb-4">{categoryName ? `Courses in ${categoryName}` : 'All Courses'}</h2>
        <Separator className="mb-4" />
        {filteredCourses.length === 0 && ( // Simplified condition to check length directly
          <div className="flex justify-center items-center my-10 text-xl"> {/* Adjusted margin top value */}
            <FaRegSadTear className="mx-2 h-8 w-8" /> Course not found
          </div>
        )}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5">
          {filteredCourses.map((course: courseSchema) => {
            const slug = course.title.toLowerCase().replace(/\s+/g, '-');
            return (
              <div key={course.id} className="bg-white border border-gray-200 rounded-lg shadow-md">
                <Link href={`/courses/${slug}-${course.id}`}>
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
                </Link>
                <div className="p-4">
                <Link href={`/courses/${slug}-${course.id}`}>
                    <p className="text-lg font-bold cursor-pointer">{course.title}</p>
                  </Link>
                  <p className="text-gray-600 text-xs mt-2 mb-4">A course by: {course.user_id}</p>
                  <p className="text-gray-500 mb-4 text-sm">{JSON.parse(course.content).about}</p>
                  <div className="flex border-y pb-5 pt-5 border-gray-900 justify-between items-center text-gray-600 text-sm">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center mb-1">
                        <LuBarChart />
                        <span className="ml-1">Level</span>
                      </div>
                      <p className="font-bold">{course.level}</p>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="flex items-center mb-1">
                        <MdOutlineTimer />
                        <span className="ml-1">Duration</span>
                      </div>
                      <p className="ml-1 font-bold">{course.duration}</p>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="flex items-center mb-1">
                        <FiAlignRight />
                        <span className="ml-1">Lessons</span>
                      </div>
                      <p className="ml-1 font-bold">{course.level}</p>
                    </div>
                  </div>
                  <Link href={`/courses/${slug}-${course.id}`}>
                    <p className="block w-full mt-4 text-blue-500 border border-blue-600 py-2 px-4 rounded text-center">Get started</p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
