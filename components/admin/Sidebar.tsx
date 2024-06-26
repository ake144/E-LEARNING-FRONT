import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  LayoutDashboard,
  Newspaper,
  Folders,
  CreditCard,
  Settings,
  User,
} from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <Command className='bg-gray-900 text-white fixed z-60 left-0 w-[230px] h-full p-4'>
      <CommandInput placeholder='Type a search...' className='bg-gray-900 text-white  mb-2 placeholder-gray-400' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Suggestions' className='text-gray-400'>
          <CommandItem>
            <LayoutDashboard className='mr-2 my-4 h-3 w-4' />
            <Link href='/'>Dashboard</Link>
          </CommandItem>
          <CommandItem>
            <Newspaper className='mr-2 my-3 h-4 w-4' />
            <Link href='/admin/courses'>Courses</Link>
          </CommandItem>
          <CommandItem>
            <Folders className='mr-2 my-3 h-4 w-4' />
            <Link href='/admin/category'>Categories</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Settings' className='text-gray-400'>
          <CommandItem>
            <User className='mr-2 my-3 h-4 w-4' />
            <Link href='/admin/profile'>Profile</Link>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
