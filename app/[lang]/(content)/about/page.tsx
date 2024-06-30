import TeamMembers from '@/components/tools/teamCard';
import Image from 'next/image'
import React from 'react'

const productsAndServices = [
    {
      title: 'Learning Management System (LMS)',
      description: `Experience seamless training and education management with our comprehensive Learning Management System (LMS). At the core of our offerings, we have an LMS that empowers you to efficiently oversee courses, monitor learner progress, and foster collaboration. Elevate your learning initiatives with our user-friendly platform.`,
    },
    {
      title: 'Curriculum Development',
      description: `At the heart of our educational solutions is the expertise in Curriculum Development. We have an LMS-centric approach, working closely with you to define precise learning objectives and curate engaging content. Our goal is to craft a tailored curriculum that seamlessly integrates with our LMS, ensuring a cohesive and impactful educational experience.`,
    },
    {
      title: 'Course Production',
      description: `Unlock the full potential of your educational content with our Course Production service. Building upon the foundation of our LMS, we specialize in creating dynamic courses. From multimedia-rich content to interactive assessments, we have the tools and expertise to transform your educational vision into compelling, accessible, and seamlessly integrated courses.`,
    },
  ];


export default function About() {
  return (
    <div className='min-h-screen  mt-[90px] '>
    
       <div className='flex lg:flex-row lg:px-[60px] mx-5 lg:mx-[80px] px-4px  flex-col'>
          <div className='flex justify-center flex-col items-center'>
               <h2 className='text-2xl flex text-azure  my-8 '>Muyalogy</h2>
                <p className='text-base flex my-6'>
                An innovative full-service learning platform that offers a comprehensive suite of online courses in a number of different areas. Our courses are designed to provide users with the most up-to-date knowledge and training in the fields of their choosing.
                 We produce, market, and manage our courses to ensure that our users have the best experience possible. With our diverse selection of courses, we strive to make learning accessible to everyone, no matter their location or level of expertise.
                </p>
          </div>
          <div className='my-6 lg:pt-[40px] pt-4'>
            <h2 className='text-black'>Logo here</h2>
        <Image
           src='/image.png'
           alt='Muyalogy Logo'
           height={500}
           width={500}
        />

          </div>
       </div>

        <div className='px-[6opx] pb-12 mx-[30px] lg:mx-[100px]'>
        <h2 className="text-3xl font-bold text-center mb-8">Products and Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {productsAndServices.map((product, index) => (
          <div key={index} className="p-6 bg-white rounded shadow-md">
            <h3 className="text-2xl font-semibold mb-4">{product.title}</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
        ))}
      </div>
        </div>

        <div className='bg-azure w-full h-auto'>
            <div className='grid pt-6 py-8   lg:mx-[70px] mx-11 lg:grid-cols-3 md:grid-cols-2 '>
                <div className='py-5 mr-3'>
                    <h2  className='text-3xl font-bold text-white'>Mission</h2>
                    <p className='text-white font-sans py-5'> Our mission at Muyalogy is to provide a comprehensive and innovative learning platform that helps people of all ages and backgrounds to learn,grow, and share their knowledge with the world. 
                        We strive to empower our users with essential training and life skills to help them reach their full potential.</p>
                </div>
                <div className='py-5 mx-2'>
                    <h2  className='text-3xl font-bold text-white'>Vision</h2>
                    <p className='text-white font-sans py-5'> Our mission at Muyalogy is to provide a comprehensive and innovative learning platform that helps people of all ages and backgrounds to learn,grow, and share their knowledge with the world. 
                        We strive to empower our users with essential training and life skills to help them reach their full potential.</p>
                </div>
                <div className='py-5'>
                    <h2  className='text-3xl font-bold text-white'>Values</h2>
                    <p className='text-white font-sans py-5'> Our mission at Muyalogy is to provide a comprehensive and innovative learning platform that helps people of all ages and backgrounds to learn,grow, and share their knowledge with the world. 
                        We strive to empower our users with essential training and life skills to help them reach their full potential.</p>
                </div>
            </div>

        </div>

        <TeamMembers />
    
    
    </div>
  )
}
