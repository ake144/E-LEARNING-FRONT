"use client"

import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { getCompletedLessons } from "../quries/getcourse"


export interface CompletedLesson {
  id: string
  userId: string
  courseId: number
  unitIndex: number
  lessonIndex: number
  completedAt: string
}

export function useCompletedLessons(courseId: number) {
  const { data: session } = useSession()

  console.log('lesson', session?.user.id)
  return useQuery({
    queryKey: ["completedLessons", courseId],
    queryFn: async () => {
      if (!session?.user?.id) {
        return []
      }

      return getCompletedLessons(courseId, session.user.id)
    },
    enabled: !!session?.user?.id && !!courseId,
    staleTime: 60000, // 1 minute
  })
}
