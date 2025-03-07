interface UpdateLessonCompletionParams {
    courseId: number
    userId: string
    unitIndex: number
    lessonIndex: number
    isCompleted: boolean
  }
  
  export async function updateLessonCompletion({
    courseId,
    userId,
    unitIndex,
    lessonIndex,
    isCompleted,
  }: UpdateLessonCompletionParams) {
    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          userId,
          unitIndex,
          lessonIndex,
          isCompleted,
        }),
      })
  
      if (!response.ok) {
        throw new Error("Failed to update lesson completion status")
      }
  
      return await response.json()
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to update lesson completion")
    }
  }
  
  