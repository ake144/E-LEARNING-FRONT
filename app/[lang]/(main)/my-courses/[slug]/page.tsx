"use client"

import { useCourseBySlug } from "@/utils/hooks/getCourse"
import { useEffect, useState, useRef, forwardRef } from "react"
import { FaRegFaceSadTear } from "react-icons/fa6"
import dynamic from "next/dynamic"

import { Checkbox } from "@/components/ui/checkbox"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"
import { CheckCircle, Play } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useCompletedLessons } from "@/utils/hooks/useCompletedLessons"
import { updateLessonCompletion } from "@/utils/quries/getcourse"
import CourseTabs from "@/components/videotabs/videotabs"

// // Dynamically import PlyrVideoComponent, disabling SSR
// interface PlyrVideoProps {
//   videoId: string;
// }

// const PlyrVideo = forwardRef<HTMLVideoElement, PlyrVideoProps>(({ videoId }, ref) => {
//   // Your video player implementation here
//   return (
//     <video ref={ref} /* other props */>
//       {/* Video source and other elements */}
//     </video>
//   );
// });

const PlyrVideo = dynamic(() => import('@/components/mediaPlayer/player'), {
  ssr: false,
});

function MyCourse({ params }: { params: { slug: string } }) {
  const { data: session } = useSession()
  const queryClient = useQueryClient()


  const slug = params.slug
  const numericId = slug.split("-").pop()

  const { data: course, isLoading, isError } = useCourseBySlug(Number(numericId))
  const { data: completedLessons = [] } = useCompletedLessons(Number(numericId))

  const [selectedVideo, setSelectedVideo] = useState<string>("")
  const [selectedLesson, setSelectedLesson] = useState<{ unitIndex: number; lessonIndex: number } | null>(null)
  const videoRef = useRef<any>(null)
  const [videoProgress, setVideoProgress] = useState(0)

  const { mutate: toggleCompletion } = useMutation({
    mutationFn: async (data: { courseId: number; userId: string; unitIndex: number; lessonIndex: number; isCompleted: boolean }) => {
      updateLessonCompletion(data)
    },

      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:["completedLessons", numericId]})
        queryClient.invalidateQueries({queryKey:["completionStatus", numericId]})
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to update lesson status. Please try again.",
          variant: "destructive",
        })
      },

  })




  useEffect(() => {
    if (course?.content && JSON.parse(course.content).units[0]?.lessons[0]?.videoUrl) {
      const content = JSON.parse(course.content)
      setSelectedVideo(content.units[0].lessons[0].videoUrl)
      setSelectedLesson({ unitIndex: 0, lessonIndex: 0 })
    }
  }, [course?.content])

  // Auto-mark lesson as completed when video ends
  useEffect(() => {
    if (videoRef.current) {
      const player = videoRef.current

      const handleVideoEnded = () => {
        if (selectedLesson && session?.user?.id) {
          const { unitIndex, lessonIndex } = selectedLesson
          const isAlreadyCompleted = isLessonCompleted(unitIndex, lessonIndex)

          if (!isAlreadyCompleted) {
            handleToggleCompletion(unitIndex, lessonIndex, true)
            toast({
              title: "Lesson completed",
              description: "This lesson has been marked as completed",
            })
          }
        }
      }

      const handleTimeUpdate = () => {
        if (player.duration) {
          setVideoProgress((player.currentTime / player.duration) * 100)

          // Mark as completed when 90% of video is watched
          if (player.currentTime / player.duration > 0.9) {
            if (selectedLesson && session?.user?.id) {
              const { unitIndex, lessonIndex } = selectedLesson
              const isAlreadyCompleted = isLessonCompleted(unitIndex, lessonIndex)

              if (!isAlreadyCompleted) {
                handleToggleCompletion(unitIndex, lessonIndex, true)
              }
            }
          }
        }
      }

      player.addEventListener("ended", handleVideoEnded)
      player.addEventListener("timeupdate", handleTimeUpdate)

      return () => {
        player.removeEventListener("ended", handleVideoEnded)
        player.removeEventListener("timeupdate", handleTimeUpdate)
      }
    }
  }, [videoRef.current, selectedLesson, session?.user?.id])

  const handleLessonSelect = (videoUrl: string, unitIndex: number, lessonIndex: number) => {
    setSelectedVideo(videoUrl)
    setSelectedLesson({ unitIndex, lessonIndex })
    setVideoProgress(0)
  }

  const handleToggleCompletion = (unitIndex: number, lessonIndex: number, isCompleted: boolean) => {
    if (!session?.user?.id) {
      toast({
        title: "Authentication required",
        description: "Please sign in to track your progress.",
        variant: "destructive",
      })
      return
    }

    toggleCompletion({
      courseId: Number(numericId),
      userId: session.user.id,
      unitIndex,
      lessonIndex,
      isCompleted,
    })
  }

  const isLessonCompleted = (unitIndex: number, lessonIndex: number) => {
    return completedLessons.some((lesson:any) => lesson.unitIndex === unitIndex && lesson.lessonIndex === lessonIndex)
  }

  const getTotalCompletionPercentage = () => {
    if (!course?.content) return 0

    const content = JSON.parse(course.content)
    let totalLessons = 0

    content.units.forEach((unit: any) => {
      totalLessons += unit.lessons.length
    })

    return totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-20 text-xl">
        <FaRegFaceSadTear className="mx-5 h-11 w-11" /> Error loading course
      </div>
    )
  }

  if (!course && !isLoading && !isError) {
    return (
      <div className="flex justify-center items-center py-20 text-xl">
        <FaRegFaceSadTear className="mx-5 h-11 w-11" /> Course not found
      </div>
    )
  }

  const courseContent = course?.content ? JSON.parse(course.content) : null
  const resources = courseContent?.resources || []

  return (
    <div className="container mx-auto mt-20 p-4">
      {isLoading && <p className="mt-[120px] justify-center items-center mx-[70px] text-xl">Loading...</p>}
      {course && (
        <div className="flex flex-col lg:flex-row mt-10 space-y-10 lg:space-y-0 lg:space-x-10">
          <div className="lg:w-3/4 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <div className="flex items-center mb-4">
                <div className="w-full mr-4">
                  <Progress value={getTotalCompletionPercentage()} className="h-2" />
                </div>
                <span className="text-sm font-medium whitespace-nowrap">
                  {getTotalCompletionPercentage()}% Complete
                </span>
              </div>
            </div>
            <div className="space-y-6 relative">
              {selectedVideo && (
                <>
                  <PlyrVideo key={selectedVideo} videoId={selectedVideo}  />
                  {videoProgress > 0 && videoProgress < 100 && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                      <div
                        className="h-full bg-blue-600 transition-all duration-300 ease-linear"
                        style={{ width: `${videoProgress}%` }}
                      ></div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Course Tabs Component */}
            <CourseTabs courseId={Number(numericId)} courseTitle={course.title} resources={resources} />
          </div>

          <div className="lg:w-1/4 bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Course Content</h2>
            {courseContent.units.map((unit: any, unitIndex: number) => (
              <div key={unitIndex} className="mb-6">
                <h3 className="text-xl font-semibold mb-3">{`Unit ${unitIndex + 1}: ${unit.title}`}</h3>
                <ul className="list-none space-y-3 mt-2">
                  {unit.lessons.map((lesson: any, lessonIndex: number) => {
                    const completed = isLessonCompleted(unitIndex, lessonIndex)
                    const isActive =
                      selectedLesson?.unitIndex === unitIndex && selectedLesson?.lessonIndex === lessonIndex

                    return (
                      <li
                        key={lessonIndex}
                        className={`
                        flex items-start space-x-2 p-2 rounded-md transition-colors
                        ${isActive ? "bg-blue-50 border border-blue-100" : "hover:bg-gray-50"}
                      `}
                      >
                        <div className="mt-1">
                          <Checkbox
                            id={`lesson-${unitIndex}-${lessonIndex}`}
                            checked={completed}
                            onCheckedChange={(checked) => {
                              handleToggleCompletion(unitIndex, lessonIndex, checked as boolean)
                            }}
                            className={completed ? "bg-green-500 text-white border-green-500" : ""}
                          />
                        </div>
                        <div
                          className={`flex-1 cursor-pointer ${completed ? "text-gray-500" : "text-gray-700"}`}
                          onClick={() => handleLessonSelect(lesson.videoUrl, unitIndex, lessonIndex)}
                        >
                          <div className="flex items-center">
                            <span className={`${isActive ? "font-medium text-blue-600" : ""}`}>{lesson.title}</span>
                            {completed ? (
                              <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                            ) : isActive ? (
                              <Play className="h-4 w-4 ml-2 text-blue-500 fill-blue-500" />
                            ) : null}
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-500">{lesson.duration}</span>
                            {!completed && !isActive && <span className="text-xs text-blue-500">Click to play</span>}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MyCourse

