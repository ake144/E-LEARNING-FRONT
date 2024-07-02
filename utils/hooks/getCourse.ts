import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import {getCourseById,deleteCourse, updateCourse,createCourse, getAllCourse } from "../quries/getcourse";
import { BaseUrl } from "../types/identifiers";

const queryClient = new QueryClient();

export function useCourseBySlug(Id: number) {
    return useQuery({
      queryKey: ['course', Id],
      queryFn: () => getCourseById(Id),
      staleTime: 60000,
      refetchOnWindowFocus: true,
    });
  }

export function useAllCourses() {
    return useQuery({
      queryKey: ['courses'],
      queryFn: getAllCourse,
      staleTime: 60000,
      refetchOnWindowFocus: true,
    });
  }

export function useCreateCourse() {
    return useMutation({
      mutationKey: ['createCourse'],
      mutationFn: createCourse,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['courses'] });
      },
    });
  }

  export const updateCategory = async ({ id, data }: { id: string, data: any }) => {
    const res = await fetch(`${BaseUrl}/category/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      throw new Error('Failed to update category');
    }
  
    return await res.json();
  };

export function useDeleteCourse() {
    return useMutation({
      mutationKey: ['deleteCourse'],
      mutationFn: deleteCourse,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['courses'] });
      },
    });
  }