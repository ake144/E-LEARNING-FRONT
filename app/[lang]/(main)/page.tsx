
import Cards from "@/components/courses/courseCard";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaRegQuestionCircle } from "react-icons/fa";
import Link from "next/link";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import HomeTitle from "@/components/home/title";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { Profile } from "@/components/tools/profile";
import  image from "@/public/learning.png";



export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const { page } = await getDictionary(lang);


  const session = await getServerSession(authOptions);
  const user = session?.user;


  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-10 lg:p-[82px] font-sans">
        <div className="w-full pt-[70px] sm:p-0">
          <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-10">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <div className="flex flex-col">
                <Image src={image} alt="logo" width={300} height={300} />
                <p className="text-6xl text-azure items-center justify-center flex">Bright Path</p>
              </div>
            </div>
            <HomeTitle lang={page} />
          </div>
          <div className="flex lg:hidden flex-row gap-3 mt-8 mb-8">
          {user ? ( <div  className='flex flex-row'>
            <Link href="/profile">
              <p className="text-gray-700 flex px-2 py-2 "><Profile /></p>
            </Link>
            <Link href='/my-courses'>
              <button  className="text-gray-700 font-sans font-bold flex px-2 pt-4 ml-4">
                    myCourse
              </button>
            </Link>
          </div>) : (<> 
            <div className="w-1/2">
              <Link href='/auth/signin'>
                <Button className="w-full p-2 bg-white hover:bg-white text-black border-2">Login</Button>
              </Link>
            </div>
            <div className="w-1/2">
              <Link href='/auth/signup'>
                <Button className="w-full p-2 hover:bg-blue-500 bg-blue-500">SignUp</Button>
              </Link>
            </div>
          </>)}
          </div>
          <Cards />
        </div>
        <div className="fixed bottom-0 p-4 right-0 flex h-48 w-[70px] items-end justify-end bg-gradient-to-t">
          <Button className="bg-azure lg:flex hidden hover:bg-azure text-white p-4 rounded-full">
            <FaRegQuestionCircle className="bg-azure w-6 h-5 mr-2" />
            <Link href='/faq'>Ask question</Link>
          </Button>
          <Link href='/faq'>
            <FaRegQuestionCircle className="bg-blue-500 text-white lg:hidden rounded-full flex w-12 h-12" />
          </Link>
        </div>
      </main>
    </>
  );
}
