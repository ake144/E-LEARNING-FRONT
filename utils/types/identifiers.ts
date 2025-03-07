

export const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


export const return_url = process.env.NEXT_PUBLIC_RETURN_URL


export interface Lesson {
    title: string
    duration: string
    videoUrl: string
    resources?: {
      title: string
      type: "pdf" | "link" | "code" | "video"
      url: string
      description?: string
    }[]
    quiz?: {
      question: string
      options: string[]
      correctAnswer: number
    }[]
  }
  
  export interface Unit {
    title: string
    description?: string
    lessons: Lesson[]
  }
  
  export interface CourseContent {
    about: string
    requirements: string[]
    targetAudience: string[]
    whatYouWillLearn: string[]
    units: Unit[]
  }
  
  export interface Course {
    id: number
    title: string
    level: "Beginner" | "Intermediate" | "Advanced"
    language: string
    duration: string
    trending: boolean
    price: number
    old_price?: number
    content: CourseContent
    created_at: Date
    category_id: number
    user_id: number
    image_url: string
    short_video_url: string
  }
  
  

// Define the Rating schem
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
    units: UnitSchema[];  // 
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
