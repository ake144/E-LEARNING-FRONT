import * as z from "zod"

// Define the content structure that will be stored as JSON
const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  duration: z.string().min(1, "Duration is required"),
  videoUrl: z.string().url("Valid video URL is required"),
  resources: z
    .array(
      z.object({
        title: z.string().min(1, "Resource title is required"),
        type: z.enum(["pdf", "link", "code", "video"]),
        url: z.string().url("Valid URL is required"),
        description: z.string().optional(),
      }),
    )
    .optional()
    .default([]),
  quiz: z
    .array(
      z.object({
        question: z.string(),
        options: z.array(z.string()),
        correctAnswer: z.number(),
      }),
    )
    .optional()
    .default([]),
})

const unitSchema = z.object({
  title: z.string().min(1, "Unit title is required"),
  description: z.string().optional(),
  lessons: z.array(lessonSchema).min(1, "At least one lesson is required"),
})

const courseContentSchema = z.object({
  about: z.string().min(1, "About section is required"),
  requirements: z.array(z.string()).min(1, "At least one requirement is needed"),
  targetAudience: z.array(z.string()).min(1, "At least one target audience is needed"),
  whatYouWillLearn: z.array(z.string()).min(1, "At least one learning objective is needed"),
  units: z.array(unitSchema).min(1, "At least one unit is required"),
})

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  language: z.string().min(1, "Language is required"),
  duration: z.string().min(1, "Duration is required"),
  trending: z.boolean().default(false),
  price: z.number().min(0, "Price must be 0 or greater"),
  old_price: z.number().optional(),
  content: courseContentSchema,
  category_id: z.number().int().positive("Valid category ID is required"),
  image_url: z.string().url("Valid image URL is required"),
  short_video_url: z.string().url("Valid preview video URL is required"),
})

export type CourseFormData = z.infer<typeof courseSchema>

