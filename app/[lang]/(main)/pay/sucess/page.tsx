'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { BaseUrl } from '@/utils/types/identifiers';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const PaymentSuccess = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  
  const courseId = searchParams.get('courseId');

  useEffect(() => {
    const createPurchasedCourse = async () => {
      if (!courseId || !session?.user) {
        return;
      }

      const { id: userId } = session.user;

      try {
        const response = await axios.post(`${BaseUrl}/course/purchased`, {
        user_id:userId,
        course_id:courseId,
        });


        console.log(response);
        if (response.status === 200) {
          router.push('/my-course'); // Redirect to the course page after successful purchase
        } else {
          console.error('Error creating purchased course');
        }
      } catch (error) {
        console.error('Error', error);
      }
    };

    createPurchasedCourse();
  }, [courseId, session?.user, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">

   <h2 className='text-2xl flex justify-center p-4 mx-2'>
            payment successfully done
   </h2>
      <Link  href='/my-courses'>  
         <Button className='mt-7 justify-center items-center text-xl ' >
          Go to  My-course
         </Button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
