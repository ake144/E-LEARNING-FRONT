import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

function MyCourse() {
  const courses = false

  return (
    <div className="flex ">
      <div className="relative  pr-10">
       { courses ? (<>
       </>
       ):(
        <div className='pt-[10px] mx-[200px] flex flex-col items-center justify-center'>
            <h1 className='text-4xl items-center justify-center mb-4 font-bold text-gray-800'>My Courses</h1>
            <p className='text-gray-500 flex items-center justify-center mb-5'>You have no courses yet</p>
              <Link  href='/courses'>
                 <Button  className=''>
                     Explore Courses
                 </Button>
              </Link>
        </div>
       )
       }
       </div>
    </div>
  )
}

export default MyCourse