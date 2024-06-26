'use client'

import Image from 'next/image';
import Link from 'next/link';
// import logo from '../img/logo.png';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSession, signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
   const userData =   useSession()
  const user = userData.data?.user; 

   
   const handleLogout = async () => {
    await signOut();
     router.push('/auth/signin');
  };


  return (
    <div className='bg-gray-900 fixed top-0 w-full z-50 text-white py-2 px-5 flex justify-between h-[80px]  items-center shadow-lg'>
      <Link href='/'>
        <h3 className='text-xl font-semibold'>Muyalogy</h3>
      </Link>

      <div className='flex items-center'>
        <DropdownMenu>
          <DropdownMenuTrigger className='focus:outline-none'>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback className='text-black'>{user?.Fname}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href='/account/profile'>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem  onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
