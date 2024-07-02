'use client'

// import { Category, Course } from "./hooks";
import { courseSchema, categorySchema } from "@/types/course";
import { BaseUrl } from "../types/identifiers";


console.log('BaseUrl:', BaseUrl);

export const getAllCourse = async (): Promise<courseSchema[]> => {
  const res = await fetch(`${BaseUrl}/course`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return await res.json();
};

export const createCourse = async (data: any) => {
  const res = await fetch(`${BaseUrl}/course`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to create course');
  }

  return await res.json();
}

export const updateCourse = async ({ id, data }: { id: number, data: any }) => {
  const res = await fetch(`${BaseUrl}/course/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to update course');
  }

  return await res.json();
}

export const deleteCourse = async (id: number) => {
  const res = await fetch(`${BaseUrl}course/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete course');
  }

  return await res.json();
}


export const getAllCategories = async (): Promise<categorySchema[]> => {
  const res = await fetch(`${BaseUrl}/category`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return await res.json();
}

export const createCategory = async (data: any) => {
  const res = await fetch(`${BaseUrl}category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to create category');
  }

  return await res.json();
}

export const getCategoryById = async (id: string) => {
  const res = await fetch(`${BaseUrl}/category/${id}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return await res.json();
}

export const updateCategory = async ({ id, data }: { id: any, data: any }) => {
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


export const deleteCategory = async (id: string) => {
  const res = await fetch(`${BaseUrl}/category/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete category');
  }

  return await res.json();
}


export const getCourseById = async (id: number) => {
  const res = await fetch(`${BaseUrl}/course/${id}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return await res.json();
};

export const addToMyCourse = async (id: number) => {
  const res = await fetch(`${BaseUrl}/course/${id}`, {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to add course');
  }

  return await res.json();
};

export const getMyCourses = async (userId: string) => {
  const res = await fetch(`${BaseUrl}/mycourses/${userId}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return await res.json();
};

export const updateProfile = async (data: any) => {
  const res = await fetch( `${BaseUrl}/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to update profile');
  }
  return await res.json();
};



export const getAllRatings = async () => {
  const res = await fetch(`${BaseUrl}/rating`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return await res.json();
}

export const createRating = async (data: any) => {
  const res = await fetch(`${BaseUrl}/rating`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to create rating');
  }

  return await res.json();
}

export const getRatingById = async (id: string) => {
  const res = await fetch(`${BaseUrl}/rating/${id}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return await res.json();
}

export const updateRating = async ({ id, data }: { id: string, data: any }) => {
  const res = await fetch(`${BaseUrl}/rating/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to update rating');
  }

  return await res.json();
};


export const deleteRating = async (id: string) => {
  const res = await fetch(`${BaseUrl}/rating/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete rating');
  }

  return await res.json();
}