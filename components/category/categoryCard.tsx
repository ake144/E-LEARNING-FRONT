'use client'

import Link from 'next/link'
import React from 'react';
import {
  FaCalculator, FaPaintBrush, FaBriefcase, FaBullhorn, FaUtensils, FaCode, FaHeartbeat,
  FaBook, FaMusic, FaUserGraduate, FaCamera, FaPencilAlt, FaFileAlt
} from 'react-icons/fa';
import { Separator } from '../ui/separator';
import { UseGetAllCategories } from '@/utils/quries/hooks';

const Categories = () => {
  const { data: categories } = UseGetAllCategories();

  // Function to extract the first word and replace whitespace
  const formatCategoryName = (name: string) => {
    const firstWord = name.split(' ')[0];
    return encodeURIComponent(firstWord); // Encodes the first word to be URL safe
  };

  return (
    <div className="p-6 w-[600px] bg-white shadow rounded-lg font-sans ">
      <div className="flex justify-between items-center">
        <h2 className="text-md font-bold">Categories</h2>
        <a href="/courses" className="text-blue-500 text-xs hover:underline">View all</a>
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-2 gap-6 mt-4">
        {categories?.map((category) => (
          <div key={category.id} className="flex items-center space-x-4">
            <Link href={`/courses/?category=${formatCategoryName(category.name)}&cat_id=${category.id}`}>
              <span className="text-gray-700 text-sm font-bold">{category.name}</span>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
        <div>
          <h3 className="font-bold text-sm">Get started</h3>
          <p className="text-gray-600 text-xs">Discover a wide range of online courses in various fields to enhance your abilities and knowledge.</p>
        </div>
        <button className="px-4 py-2 text-md bg-blue-500 text-white rounded hover:bg-blue-600">
          <Link href='/auth/signup'>
            Get started
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Categories;
