'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { BaseUrl } from '@/utils/types/identifiers';

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
        const response = await axios.post(`${BaseUrl}/purchased`, {
          userId,
          courseId,
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
      <h1>Processing your purchase...</h1>
    </div>
  );
};

export default PaymentSuccess;
