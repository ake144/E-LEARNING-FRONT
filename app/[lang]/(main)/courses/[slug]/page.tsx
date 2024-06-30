'use client'
import { MdOutlineSubtitles } from 'react-icons/md';
import { RxAvatar } from "react-icons/rx";
import { CiShare2 } from "react-icons/ci";
import { Button } from '@/components/ui/button';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { LuBarChart } from "react-icons/lu";
import { FiAlignRight } from "react-icons/fi";
import { MdOutlineTimer, MdLanguage, MdQuiz, MdGroup } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";
import { Separator } from '@/components/ui/separator';
import { CiMobile3 } from "react-icons/ci";
import { SiPowerpages } from "react-icons/si";
import ShareModal from '@/components/tools/share'
import Testimonials from '@/components/Testimonals'
import { FaRegFaceSadTear } from "react-icons/fa6";
import { useCourseBySlug } from '@/utils/hooks/getCourse';
import { courseSchema } from '@/types/course';
import { useState } from 'react';


interface CourseSchema {
  title: string;
  instructor: string;
  level: string;
  videoUrl: string;
  language: string;
  subtitle: string;
  duration: string;
  lessons: number;
  resources: number;
  quiz: number;
  access: string;
  short_video_url: string;
  content: string;
}





const courses = [
  {
    title: 'The Art of Filmmaking: Mastering Storytelling and Editing with Adobe Premiere Pro',
    instructor: 'Robel Birhanu',
    level: 'Beginner',
    language: 'Amharic',
    subtitle: 'Amharic, English',
    duration: '5:00 h',
    lessons: 24,
    resources: 25,
    videoUrl: 'https://www.youtube.com/embed/1rjXwVKR9JQ?autoplay=1',
    quiz: 6,
    access: 'mobile, desktop, and TV',
  },
];

const url = 'https://muyalogy.com/courses/the-art-of-filmmaking-mastering-storytelling-and-editing-with-adobe-premiere-pro';

const CoursePage = ({params}:{params: {slug:string}}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  // const [course, setCourse] = useState<CourseSchema | null>(null);

  const slug = params.slug;
  console.log(slug);



  const numericId = slug.split('-').pop();
    console.log(numericId); // This should log '9'

const {data:course, isLoading, isError} = useCourseBySlug(Number(numericId));
  
  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  // useEffect(() => {
  //   if (slug) {
  //     const foundCourse = courses.find(course => course.title.toLocaleLowerCase().replace(/\s+/g, '-') === slug);
  //     if (foundCourse) {
  //       setCourse(foundCourse);
  //     }
  //   }
  // }, [slug])




  return (<>
    {course === null && <div className='flex justify-center items-center mt-11 py-[100px] text-xl'><FaRegFaceSadTear className='mx-5 h-11 w-[40px] '/> Course not found</div>}
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
              <p className="text-md justify-center pt-4 items-center flex">Ready to become a filmmaker?</p>
              <button className="flex bg-green-500 text-white py-2 px-4 rounded mb-4">
                <p className='flex items-center justify-center w-full'>Buy Course</p>
              </button>
              <Separator className='my-4' />
              <p className='flex items-center'><LuBarChart className='mr-4' /> Level: {course.level}</p>
              <p className='flex items-center'><MdLanguage className='mr-4' /> Language: {course.language}</p>
              <p className="flex items-center"><MdOutlineSubtitles className="mr-4" /> Subtitle: {course.subtitle}</p>
              <p className='flex items-center'><MdOutlineTimer className="mr-4" /> Duration: {course.duration}</p>
              <p className='flex items-center'><FiAlignRight className='mr-4' /> Lessons: {course.lessons}</p>
              <p className='flex items-center'><SiPowerpages className='mr-4' /> Resources: {course.resources}</p>
              <p className='flex items-center'><MdQuiz className='mr-4' /> Quiz: {course.quiz}</p>
              <p className='flex items-center'><CiMobile3 className='mr-4' /> Access: {course.access}</p>
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
      {isShareModalOpen && <ShareModal url={url} onClose={closeShareModal} />}
    </div>
  </div>
  <div className='text-sm mb-5'>
    <p>{JSON.parse(course.content).about}</p>
    <h2 className='text-2xl font-bold mt-5 mb-3'>Requirements</h2>
    <ul className='ml-6 list-disc'>
      {JSON.parse(course.content).requirements.map((item: any, index:any) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
    <h2 className='text-2xl font-bold mt-5 mb-3'>Who is this course for?</h2>
    <ul className='ml-6 list-disc'>
      {JSON.parse(course.content).targetAudience.map((item:any, index: any) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
    <h2 className='text-2xl font-bold mt-5'>What you will learn</h2>
    {JSON.parse(course.content).units.map((unit: { title:any; lessons: any[]; }, unitIndex: any | ((prevState: boolean) => boolean) | null | undefined) => (
      <div key={unitIndex} className='border rounded-md p-4 mt-5'>
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">{unit.title}</h2>
          <button onClick={() => setIsOpen(unitIndex !== isOpen ? unitIndex : false)}>
            {isOpen === unitIndex ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
        {isOpen === unitIndex && (
          <div className="mt-2">
            {unit.lessons.map((lesson: { title: string }, lessonIndex: any) => (
              <p key={lessonIndex} className="flex items-center cursor-pointer">
                <span className="mr-2">▶️</span> {lesson.title}
              </p>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
</div>

        <Testimonials />
      </div>
      <div className="lg:w-[300px] hidden lg:flex flex-col mr-11 p-4 gap-6 text-sm bg-white border sticky top-24 self-start">
        <p className="text-md justify-center items-center flex mb-2">Ready to become a filmmaker?</p>
        <button className="bg-green-500 text-white py-1 px-4 rounded mb-2">Buy Course</button>
        <p className="flex items-center"><LuBarChart className='mr-2' /> Level: {course.level}</p>
        <p className="flex items-center"><MdLanguage className='mr-2' /> Language: {course.language}</p>
        <p className="flex items-center"><MdOutlineSubtitles className="mr-2" /> Subtitle: {course.subtitle}</p>
        <p className="flex items-center"><MdOutlineTimer className="mr-2" /> Duration: {course.duration}</p>
        <p className="flex items-center"><FiAlignRight className='mr-2' /> Lessons: {course.lessons}</p>
        <p className="flex items-center"><SiPowerpages className='mr-2' /> Resources: {course.resources}</p>
        <p className="flex items-center"><MdQuiz className='mr-2' /> Quiz: {course.quiz}</p>
        <p className="flex items-center"><CiMobile3 className='mr-2' /> Access: {course.access}</p>
        <p className="flex items-center"><MdGroup className='mr-2' /> Lifetime access to the community</p>
        <p className="flex items-center"><TbCertificate className='mr-2' /> Certificate of Completion</p>
      </div>
    </div>
    )}
    </>
  );
};

export default CoursePage;
