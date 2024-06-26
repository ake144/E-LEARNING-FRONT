'use client'


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllCourse, getCourseById, addToMyCourse, getMyCourses, updateProfile, getAllCategories, createCategory, updateCategory, deleteCategory, getCategoryById } from './getcourse';


export interface Course {
  id: number;
  category: string;
  title: string;
  instructor: string;
  description: string;
  level: string;
  duration: string;
  lessons: number;
  image: string;
}
export interface Category {
id: number;
name: string;

}

// export function useAllCourses() {
//   return useQuery<Course[],Error>({
//     queryKey: ['courses'],
//     queryFn: getAllCourse,
//     staleTime: 60000, // 1 minute
//     refetchOnWindowFocus: true,
//   });
// }

export function UseGetAllCategories() {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: getAllCategories,
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
}

export function useCategoryById(id: string) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id),
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createcategory'],
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updatecategory'],
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deletecategory'],
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}



export function useCourseBySlug(Id: number) {
  return useQuery({
    queryKey: ['course', Id],
    queryFn: () => getCourseById(Id),
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
}

export function useMyCourses(userId: string) {
  return useQuery({
    queryKey: ['mycourses', userId],
    queryFn: () => getMyCourses(userId),
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
}

export function useAddToMyCourses() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addcourse'],
    mutationFn: addToMyCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mycourses'] });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateprofile'],
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

