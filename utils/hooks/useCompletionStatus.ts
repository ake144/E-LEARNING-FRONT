"use client"

import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { getCertificate, getCourseCompletionStatus } from "../quries/getcourse"

export interface CompletionStatus {
  totalLessons: number
  completedLessons: number
  isCompleted: boolean
  certificateId?: string
}

export function useCompletionStatus(courseId: number): CompletionStatus {
  const { data: session } = useSession();

  const { data: status } = useQuery({
    queryKey: ["completionStatus", courseId],
    queryFn: async (): Promise<Omit<CompletionStatus, "certificateId">> => {
      if (!session?.user?.id) {
        return { totalLessons: 0, completedLessons: 0, isCompleted: false };
      }
      return await getCourseCompletionStatus(courseId, session.user.id);
    },
    enabled: !!session?.user?.id && !!courseId,
    staleTime: 60000, // 1 minute
  });

  const { data: certificate } = useQuery({
    queryKey: ["certificate", courseId],
    queryFn: async () => {
      if (!session?.user?.id || !status?.isCompleted) return null;
      return await getCertificate(courseId, session.user.id);
    },
    enabled: !!session?.user?.id && !!courseId && !!status?.isCompleted,
    staleTime: 300000, // 5 minutes
  });

  return {
    totalLessons: status?.totalLessons || 0,
    completedLessons: status?.completedLessons || 0,
    isCompleted: status?.isCompleted || false,
    certificateId: certificate?.id,
  };
}