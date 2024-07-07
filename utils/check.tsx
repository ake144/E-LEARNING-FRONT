'use client'


import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';

    
    
  
    // Function to check if a course is purchased
    export const isCoursePurchased = (courseId: any, userId:any, BaseUrl:any) => {
        const { data: session, status } = useSession();
        const [courses, setCourses] = useState<any[]>([]);
        const [purchasedCourses, setPurchasedCourses] = useState<any[]>([]);
        const [error, setError] = useState<any>(null);
      
        useEffect(() => {
          const fetchCourses = async () => {
            if (!userId) return;
      
            try {
              const response = await fetch(`${BaseUrl}/course/purchased/${userId}`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const result = await response.json();
              console.log("purchased", result);
              setPurchasedCourses(result);
            } catch (error: any) {
              setError(error);
            }
          };
      
          fetchCourses();
        }, [userId]);


      return purchasedCourses.some((course: any) => course.id === courseId);
  

    }
 