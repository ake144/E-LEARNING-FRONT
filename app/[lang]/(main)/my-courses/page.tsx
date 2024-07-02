import MyCourse from '@/components/courses/myCourse'
import PlyrVideo from '@/components/mediaPlayer/player'

import React from 'react'

function MyCourses() {
  
  
  const videoId = '8UiPrkz3mEg';

  return (
    <div>
   <div className="flex  mt-[150px]  mx-[60px] justify-between items-center">
       <MyCourse/>
        </div>
      <div className='mx-[50px]'>
        <PlyrVideo  videoId={videoId} />
        </div>
    </div>
  )
}

export default MyCourses