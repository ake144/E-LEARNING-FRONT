'use client';

import { useState, useEffect, SetStateAction } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search() {
  const router = useRouter();

  
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300); // Adjust the delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      router.push(`/search?query=${debouncedTerm}`);
    }
  }, [debouncedTerm, router]);

  function handleSearch(event: { target: { value: SetStateAction<string>; }; }) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <div className="relative w-80 pr-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 left-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2  placeholder:text-gray-500"
          placeholder='What do you want to learn?'
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>
    </div>
  );
}
