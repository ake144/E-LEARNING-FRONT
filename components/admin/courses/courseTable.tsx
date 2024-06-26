'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import { useAllCourses } from '@/utils/hooks/getCourse';
import Link from 'next/link';
import PostsPagination from './coursePagination'; // Ensure you have the correct import path

interface CoursesTableProps {
  limit?: number;
  title?: string;
}

const CoursesTable = ({ limit, title }: CoursesTableProps) => {
  const { data: allCourses = [], refetch } = useAllCourses();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Number of courses per page

  // Calculate total pages
  const totalPages = Math.ceil(allCourses.length / pageSize);

  // Paginate courses
  const paginatedCourses = allCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='mt-10'>
      <h3 className='text-2xl mb-4 font-semibold'>{title ? title : 'Courses'}</h3>
      <Link href='/addCourse'>
        <Button>Add New Course</Button>
      </Link>
      <Table>
        <TableCaption>A list of recent courses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className='hidden md:table-cell'>Instructor</TableHead>
            <TableHead className='hidden md:table-cell text-right'>Duration</TableHead>
            <TableHead>View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCourses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.title}</TableCell>
              <TableCell className='hidden md:table-cell'>{course.user_id}</TableCell>
              <TableCell className='text-right hidden md:table-cell'>{course.duration}</TableCell>
              <TableCell>
                <Link href={`/courses/edit/${course.id}`}>
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs'>
                    Edit
                  </button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PostsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CoursesTable;
