'use client'

import { courseSchema, categorySchema } from "@/types/course";
import { BaseUrl } from "../types/identifiers";


export const getAllCourse = async (): Promise<courseSchema[]> => {
  console.log('BaseUrl',BaseUrl)
const res = await fetch(`${BaseUrl}/course`);

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

// New API functions for lesson completion and certificates

export interface LessonCompletionData {
  userId: string
  courseId: number
  unitIndex: number
  lessonIndex: number
  isCompleted: boolean
}

export const updateLessonCompletion = async (data: LessonCompletionData) => {
  const res = await fetch(`${BaseUrl}/progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error("Failed to update lesson completion status")
  }

  return await res.json()
}

export const getCompletedLessons = async (courseId: number, userId: string) => {
  const res = await fetch(`${BaseUrl}/progress/${courseId}?userId=${userId}`)

  if (!res.ok) {
    throw new Error("Failed to fetch completed lessons")
  }

  return await res.json()
}

export const getCourseCompletionStatus = async (courseId: number, userId: string) => {
  const res = await fetch(`${BaseUrl}/progress/status/${courseId}?userId=${userId}`)

  if (!res.ok) {
    throw new Error("Failed to fetch course completion status")
  }

  return await res.json()
}

export interface CertificateData {
  userId: string
  courseId: number
  userName: string
  completionDate: string
}

export const generateCertificate = async (data: CertificateData) => {
  const res = await fetch(`${BaseUrl}/certificates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error("Failed to generate certificate")
  }

  return await res.json()
}

export const getCertificate = async (courseId: number, userId: string) => {
  const res = await fetch(`${BaseUrl}/certificates?courseId=${courseId}&userId=${userId}`)

  if (!res.ok && res.status !== 404) {
    // 404 is acceptable - means no certificate yet
    throw new Error("Failed to fetch certificate")
  }

  return res.status === 404 ? null : await res.json()
}

export const verifyCertificate = async (certificateId: string) => {
  const res = await fetch(`${BaseUrl}/certificates/verify?id=${certificateId}`)

  if (!res.ok) {
    throw new Error("Failed to verify certificate")
  }

  return await res.json()
}

export const downloadCertificate = async (certificateId: string) => {
  window.open(`${BaseUrl}/certificates/${certificateId}/download`, "_blank")
}

