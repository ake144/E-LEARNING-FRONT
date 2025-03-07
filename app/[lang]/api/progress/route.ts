import { NextResponse } from "next/server"
import { useSession } from "next-auth/react"


export async function POST(req: Request) {
  try {


    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { courseId, userId, unitIndex, lessonIndex, isCompleted } = await req.json()

    // Validate that the user is updating their own progress
    if (session.user.id !== userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if the lesson completion record already exists
    const existingRecord = await db.lessonCompletion.findFirst({
      where: {
        courseId,
        userId,
        unitIndex,
        lessonIndex,
      },
    })

    if (isCompleted) {
      // If marking as completed and record doesn't exist, create it
      if (!existingRecord) {
        const completion = await db.lessonCompletion.create({
          data: {
            courseId,
            userId,
            unitIndex,
            lessonIndex,
            completedAt: new Date(),
          },
        })
        return NextResponse.json(completion)
      }
      // If already exists, return it
      return NextResponse.json(existingRecord)
    } else {
      // If marking as not completed and record exists, delete it
      if (existingRecord) {
        await db.lessonCompletion.delete({
          where: {
            id: existingRecord.id,
          },
        })
      }
      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error("Error updating lesson completion:", error)
    return new NextResponse("Error updating lesson completion", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get("courseId")
    const userId = searchParams.get("userId")

    if (!courseId || !userId) {
      return new NextResponse("Missing required parameters", { status: 400 })
    }

    // Validate that the user is requesting their own progress
    if (session.user.id !== userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const completions = await db.lessonCompletion.findMany({
      where: {
        courseId: Number.parseInt(courseId),
        userId,
      },
    })

    return NextResponse.json(completions)
  } catch (error) {
    console.error("Error fetching lesson completions:", error)
    return new NextResponse("Error fetching lesson completions", { status: 500 })
  }
}

