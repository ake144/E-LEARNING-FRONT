'use client';

import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Categories from '@/components/category/categoryCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import DialogSignUp from '@/components/auth/dialogSignUp';
import  Search from '@/components/search/search'
import DialogLogin from './auth/dialogLogin';
import { Profile } from './tools/profile';
import LocaleSwitcher from './tools/localSwitcher';
import { useSession } from 'next-auth/react';
import { UseGetAllCategories } from '@/utils/quries/hooks';

export default  function Navbar({ lang }: { lang: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [step, setStep] = useState(1);


  const { data: categories } = UseGetAllCategories();

  // Function to extract the first word and replace whitespace
  const formatCategoryName = (name: string) => {
    const firstWord = name.split(' ')[0];
    return encodeURIComponent(firstWord); // Encodes the first word to be URL safe
  };
 
  const userData  =  useSession();

  const user = userData.data?.user;

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50 font-sans">
      <div className="container mx-auto flex items-center justify-between p-4">

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden text-black">
              <span className="sr-only">menu</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-white w-70% h-full overflow-y-auto snap-y scroll-smooth focus:scroll-auto">
            <div className="flex top-0 left-0 mb-5 p-4 border-b justify-start items-start border-gray-200">
              <h1 className="text-md">Menu</h1>
            </div>
            <nav className="p-4">
              <ul className="space-y-4">
                <li><Link href="/" className="text-md">Home</Link></li>
                <li><Link href="/my-courses" className="text-md">{lang.navbar.myCourse}</Link></li>
                    <li
                      onClick={() => setIsOpen(!isOpen)}
                      className="text-md cursor-pointer flex items-center"
                    >
                      {lang.navbar.courses}
                      <svg className="ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                      
                    </li>
                    {isOpen && <div
                   className="px-4 py-2">
                    {categories?.map((category)=>{
                      return(
                        <div key={category.name} className='flex items-center space-x-4 gap-4 mb-6'>
                          {/* <div className='text-blue-500 text-2xl'>
                            {category.icon}
                          </div> */}
                          <Link href={`/courses/?category=${formatCategoryName(category.name)}&cat_id=${category.id}`}>
                            <span className="text-gray-700 text-sm font-bold">{category.name}</span>
                          </Link>
                        </div>
                      )
                    
                    })
                      
                    }
                  </div>
                  }
                <Search />
                <div className="flex flex-row gap-3 mt-8 mb-8">
                {user ? ( <div  className='flex flex-row'>
                    <Link href="/profile">
                      <p className="text-gray-700 flex px-2 py-2 "><Profile /></p>
                    </Link>
                    <Link href='/my-courses'>
                      <button  className="text-gray-700 font-sans font-bold flex px-2 pt-4 ml-4">
                      {lang.navbar.myCourse}
                      </button>
                    </Link>
                  </div>)
                  :  <div> 
                    <div className="w-1/2">
                    <Link href='/auth/signin'>
                      <Button className="w-full p-2 font-sans font-bold bg-white hover:bg-white text-black border-2">
                        {lang.navbar.login}
                      </Button>
                    </Link>
                    </div>
                    <div className="w-1/2">
                      <Link href='/auth/signup'>
                        <Button className="w-full p-2 font-sans font-bold hover:bg-blue-500 bg-blue-500">
                          {lang.navbar.signUp}
                        </Button>
                      </Link>
                    </div>
                    </div>
                  }

                  </div>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center sm:justify-center left-[120px] space-x-30">
          <Link href="/">
            <p className="text-2xl font-bold text-azure font-sans   lg:ml-[90px]">Muyalogy</p>
          </Link>
        </div>

        <div className="hidden lg:flex items-center mr-6">
          <Popover open={isHovered} onOpenChange={(open) => setIsHovered(open)}>
            <PopoverTrigger asChild>
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="flex items-center space-x-1 font-bold  cursor-pointer"
              >
                <span>{lang.navbar.courses}</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </PopoverTrigger>
            <PopoverContent  
            className='w-[650px]'
               onMouseEnter={()=>setIsHovered(true)}
               onMouseLeave={()=>setIsHovered(false)}>
                <Categories  />
            </PopoverContent>
          </Popover>

         <Search  />
           <div className='flex left-40 pl-10'>
          {user ? ( <div  className='flex flex-row'>
            <Link href="/profile">
              <p className="text-gray-700 flex px-2 py-2 "><Profile /></p>
            </Link>
            <Link href='/my-courses'>
              <button  className="text-gray-700 font-sans font-bold flex px-2 pt-4 ml-4">
               {lang.navbar.myCourse}
              </button>
            </Link>
          </div>) : (<>   
           <Dialog>
                <DialogTrigger asChild>
                    <Button className='text-black font-bold  py-2 rounded-md border bg-white px-4' variant="outline">{lang.navbar.login}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] dialog-overlay bg-white">
                    <DialogHeader>
                    <DialogTitle>Account</DialogTitle>
                    </DialogHeader>
                    
                      <DialogLogin />
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="px-4 py-2 bg-azure hover:bg-azure-dar  hover:text-white text-white mx-4 rounded-md" variant="outline">{lang.navbar.signUp}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] dialog-overlay bg-white">
                    <DialogHeader>
                    <DialogTitle>Account</DialogTitle>
                    </DialogHeader>
                    
                      <DialogSignUp />
                </DialogContent>
            </Dialog>
            </>  )}
          </div>
        </div>
        <div className='mr-9' >
           <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
