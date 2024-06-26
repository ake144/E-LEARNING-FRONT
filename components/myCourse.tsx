import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

function MyCourse() {
  const courses = false

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <div className="relative w-80 pr-10">
       { courses ? (<>
       </>
       ):(
        <div className='pt-[10px] flex flex-col left-10 px-10 items-center justify-center'>
            <h1 className='text-4xl  font-bold text-gray-800'>My Courses</h1>
            <p className='text-gray-500'>You have no courses yet</p>
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