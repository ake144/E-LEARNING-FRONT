'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MdOutlineSubtitles, MdOutlineTimer, MdLanguage, MdGroup } from 'react-icons/md';
import { TbCertificate } from 'react-icons/tb';
import { LuBarChart } from 'react-icons/lu';
import { RxAvatar } from 'react-icons/rx';
import { CiShare2 } from 'react-icons/ci';
import { FaChevronDown, FaChevronUp, FaRegFaceSadTear } from 'react-icons/fa6';
import { BaseUrl, return_url } from '@/utils/types/identifiers';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ShareModal from '@/components/tools/share';
import Testimonials from '@/components/Testimonals';
import { useCourseBySlug } from '@/utils/hooks/getCourse';
import { Currency } from 'lucide-react';
import axios from 'axios';



const CoursePage = ({ params }: { params: { slug: string } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
 

  const slug = params.slug;


  const numericId = slug.split('-').pop();
  const { data: course, isLoading, isError } = useCourseBySlug(Number(numericId));

  const handlePay = async () => {
    const user = session?.user;
  
    if (!user) {
      router.push('/auth/signin');
      return 
    }
  
    const { Fname, Lname, email, username } = user;
    const first_name = Fname;
    const last_name = Lname; // Ensure last_name is available
    const phone_number = '1234567890'; // Add a phone number if available
    const currency = 'ETB';
    const amount = 200;
    const redirect_url = return_url; // Replace with your actual return URL
    const BaseUrl = 'http://localhost:4003';
  
    try {

      
      const response = await axios.post(`${BaseUrl}/payment`, {
        amount,
        currency,
        email,
        first_name,
        last_name,
        phone_number,
        tx_ref: `${username}-${Date.now()}`, // Generate a unique transaction reference
        redirect_url,
        payment_options: 'card',
        customizations: {
          title: 'Payment for items in cart',
          description: "Middleout isn't free. Pay the price",
          logo: 'https://assets.piedpiper.com/logo.png',
        },
        withCredentials: true,
      });
  
     if(!response){
        throw new Error('Error processing payment request');
      }
  
      const responseData = response.data;
      window.location.href = responseData.data.checkout_url;
    } catch (error) {
      console.error('Error', error);
    }
  };

  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && (
        <div className='flex justify-center items-center mt-11 py-[100px] text-xl'>
          <FaRegFaceSadTear className='mx-5 h-11 w-[40px]' /> Error loading course
        </div>
      )}
      {!course && !isLoading && !isError && (
        <div className='flex justify-center items-center mt-11 py-[100px] text-xl'>
          <FaRegFaceSadTear className='mx-5 h-11 w-[40px]' /> Course not found
        </div>
      )}
      {course && (
        <div className="flex flex-col lg:flex-row min-h-screen mt-[100px] p-4 font-sans">
          <div className="flex-1 lg:w-full p-4 lg:pl-[100px]">
            <h1 className="lg:text-3xl text-2xl font-bold mb-5">{course.title}</h1>
            <div className='flex flex-row mb-5'>
              <div><RxAvatar className='w-12 h-12' /></div>
              <div className='ml-4 text-gray-500'>
                <p>A course by</p>
                <p>{course.instructor}</p>
              </div>
            </div>
            <div className="h-[400px] w-full mb-4 rounded-lg">
              <iframe 
                src={course.short_video_url} 
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className='rounded-lg'
              />
            </div>
            <div className="flex flex-col lg:hidden">
              <div className="p-4 w-full bg-white border mb-5 sticky top-0">
                <div className="flex flex-col gap-4 text-sm">
                  <button onClick={handlePay} className="flex bg-green-500 text-white py-2 px-4 rounded mb-4">
                    Buy Course
                  </button>
                  <Separator className='my-4' />
                  <p className='flex items-center'><LuBarChart className='mr-4' /> Level: {course.level}</p>
                  <p className='flex items-center'><MdLanguage className='mr-4' /> Language: {course.language}</p>
                  <p className="flex items-center"><MdOutlineSubtitles className="mr-4" /> Subtitle: {course.subtitle}</p>
                  <p className='flex items-center'><MdOutlineTimer className="mr-4" /> Duration: {course.duration}</p>
                  <p className='flex items-center'><MdGroup className='mr-4' /> Lifetime access to the community</p>
                  <p className='flex items-center'><TbCertificate className='mr-4' /> Certificate of Completion</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-4 mb-5'>
              <div className='flex flex-col lg:flex-row lg:justify-between mb-5'>
                <div className='text-2xl font-bold mb-5 lg:mb-0'>About the Course</div>
                <div className='flex items-end justify-end'>
                  <Button onClick={openShareModal} className='w-full lg:w-auto bg-white hover:bg-blue-100 border-2 text-blue-500'>
                    <CiShare2 className='text-blue-500 mr-3' /> Share
                  </Button>
                  {isShareModalOpen && <ShareModal url={'muyalogy.com'} onClose={closeShareModal} />}
                </div>
              </div>
              <div className='text-sm mb-5'>
                <p>{JSON.parse(course.content)?.about}</p>
                <h2 className='text-2xl font-bold mt-5 mb-3'>Requirements</h2>
                <ul className='ml-6 list-disc'>
                  {JSON.parse(course.content)?.requirements?.map((item: any, index: any) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h2 className='text-2xl font-bold mt-5 mb-3'>Who is this course for?</h2>
                <ul className='ml-6 list-disc'>
                  {JSON.parse(course.content)?.targetAudience?.map((item: any, index: any) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h2 className='text-2xl font-bold mt-5'>What you will learn</h2>
                {JSON.parse(course.content)?.units?.map((unit: { title: any; lessons: any[]; }, unitIndex: any) => (
                  <div key={unitIndex} className='border rounded-md p-4 mt-5'>
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg">{unit.title}</h2>
                      <button onClick={() => setIsOpen(unitIndex !== isOpen ? unitIndex : isOpen)}>
                        {isOpen === unitIndex ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    </div>
                    {isOpen === unitIndex && (
                      <div className="mt-2">
                        {unit.lessons.map((lesson: { title: string }, lessonIndex: any) => (
                          <p key={lessonIndex} className='text-sm'>
                            {lesson.title}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/4 lg:pl-4 p-4 bg-white">
            <div className="sticky top-[100px] p-4 border">
            <button onClick={handlePay} className="flex bg-green-500 text-white py-2 px-4 rounded mb-4">
                    Buy Course
                  </button>
                  <Separator className='my-6' />
                  <p className='flex items-center mb-3'><LuBarChart className='mr-4' /> Level: {course.level}</p>
                  <p className='flex items-center mb-3'><MdLanguage className='mr-4' /> Language: {course.language}</p>
                  <p className="flex items-center  mb-3"><MdOutlineSubtitles className="mr-4" /> Subtitle: {course.subtitle}</p>
                  <p className='flex items-center  mb-3'><MdOutlineTimer className="mr-4" /> Duration: {course.duration}</p>
                  <p className='flex items-center mb-3'><MdGroup className='mr-4' /> Lifetime access to the community</p>
                  <p className='flex items-center mb-3'><TbCertificate className='mr-4' /> Certificate of Completion</p>
            </div>
          </div>
        </div>
      )}
      <Testimonials />
    </>
  );
};

export default CoursePage;
