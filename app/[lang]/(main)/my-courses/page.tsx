'use client'

import MyCourse from '@/components/courses/myCourse'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';


import dynamic from 'next/dynamic';



// Dynamically import PlyrVideoComponent, disabling SSR
const PlyrVideo = dynamic(() => import('@/components/mediaPlayer/player'), {
  ssr: false,
});

 function MyCourses() {
  const { data: session, status } = useSession();
  const [course, setCourse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const userId = session?.user?.id;



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4003purchased/${userId}`); // Replace '1' with the actual course ID or dynamically fetched ID
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result)
        setCourse(result);
      } catch (error:any) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  // Assuming course contains the videoId field after fetching from backend
  const videoId = course?.video || 'i8qukld8Z18'; // Fallback or default videoId if course is not loaded

  return (
    <div>
      <div className="flex  mx-6 mt-[70px] justify-between items-center">
        <MyCourse />
      </div>
      <div className="mx-6">
        <PlyrVideo videoId={videoId} />
      </div>
    </div>
  );
}

export default MyCourses