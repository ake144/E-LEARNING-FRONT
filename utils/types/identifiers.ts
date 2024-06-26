import { NextParsedUrlQuery } from "next/dist/server/request-meta";

// Define the Rating schema
export interface RatingSchema {
    id: number;
    value: number;
    message: string;
    course_id: number;
    reviewer_id: number;
}


export interface UnitSchema {
    id: number;
    title: string;
    lessons: LessonSchema[];
}

// Define the Course schema
export interface CourseSchema {
    id: number;
    title: string;
    level: string;
    short_video_url: string;
    image_url: string;
    language: string;
    duration: string;
    description: string;
    price: number;
    content: JSON;
    category_id:number; 
    instructor: string;
    trending?: boolean;
    old_price?: number;
    ratings: RatingSchema[];
    units: UnitSchema[];  // Nested structure for units and lessons
    access: string;
} 


export interface LessonSchema {
    id: number;
    title: string;
    duration: string;  
}

// Define the Category schema
export interface CategorySchema {
    id: number;
    name: string;
}

// Define the User schema
export interface UserSchema {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    type?: string;
    password: string;
}