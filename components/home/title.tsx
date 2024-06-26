// components/home/title.tsx
'use client';

import { TypeAnimation } from "react-type-animation";
import { IoMdCheckmarkCircle } from "react-icons/io";

const HomeTitle = ({ lang }: { lang: any }) => {
  return (
    <div className="w-full lg:w-1/2">
      <h1 className="mb-4 text-3xl sm:text-4xl lg:text-5xl lg:leading-normal font-extrabold">
        <span className="bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
          {lang.home.title}
        </span>
        <br />
        <TypeAnimation
          className="text-blue-500"
          sequence={[
            "Software Developers", 1000,
            "Graphics designers", 1000,
            "Fashion Designers", 1000,
            "UI/UX Designer", 1000,
            "Business Leaders", 1000,
            "Videographers", 1000,
            "Influences", 1000,
            "Music Producers", 1000,
            "Accountants", 1000,
            "Photographers", 1000,
            "Digital Marketers", 1000,
            "Artists", 1000,
            "Beauty Professionals", 1000,
            "Entrepreneurs", 1000,
            "Sales Professionals", 1000,
            "Cake Decorators", 1000,
            "Musicians", 1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </h1>
      <div className="mt-4 space-y-4">
        <div className="flex items-start">
          <IoMdCheckmarkCircle className="h-6 w-6 mr-2 text-blue-500" />
          <div>
            <span className="text-md font-bold">{lang.home.learnFromBest}</span>
            <p className="text-gray-600">{lang.home.learnFromBestDescription}</p>
          </div>
        </div>
        <div className="flex items-start">
          <IoMdCheckmarkCircle className="h-6 w-6 mr-2 text-blue-500" />
          <div>
            <span className="text-md font-bold">{lang.home.watchCourses}</span>
            <p className="text-gray-600">{lang.home.watchCoursesDescription}</p>
          </div>
        </div>
        <div className="flex items-start">
          <IoMdCheckmarkCircle className="h-6 w-6 mr-2 text-blue-500" />
          <div>
            <span className="text-md font-bold">{lang.home.learnWithoutBarrier}</span>
            <p className="text-gray-600">{lang.home.learnWithoutBarrierDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeTitle;
