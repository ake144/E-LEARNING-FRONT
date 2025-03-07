import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { courseId, userId, userName, completionDate } = await req.json()

    // Validate that the user is creating their own certificate
    if (session.user.id !== userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if the user has completed all lessons in the course
    const course = await db.course.findUnique({
      where: { id: courseId },
    })

    if (!course) {
      return new NextResponse("Course not found", { status: 404 })
    }

    const courseContent = JSON.parse(course.content.toString())
    let totalLessons = 0

    courseContent.units.forEach((unit: any) => {
      totalLessons += unit.lessons.length
    })

    const completedLessons = await db.lessonCompletion.count({
      where: {
        courseId,
        userId,
      },
    })

    if (completedLessons < totalLessons) {
      return new NextResponse("Course not fully completed", { status: 400 })
    }

    // Check if certificate already exists
    const existingCertificate = await db.certificate.findFirst({
      where: {
        courseId,
        userId,
      },
    })

    if (existingCertificate) {
      return NextResponse.json(existingCertificate)
    }

    // Generate a unique certificate ID
    const certificateId = uuidv4()

    // Create the certificate
    const certificate = await db.certificate.create({
      data: {
        id: certificateId,
        courseId,
        userId,
        userName,
        courseName: course.title,
        issueDate: new Date(completionDate),
      },
    })

    return NextResponse.json(certificate)
  } catch (error) {
    console.error("Error generating certificate:", error)
    return new NextResponse("Error generating certificate", { status: 500 })
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

    // Validate that the user is requesting their own certificate
    if (session.user.id !== userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const certificate = await db.certificate.findFirst({
      where: {
        courseId: Number.parseInt(courseId),
        userId,
      },
    })

    if (!certificate) {
      return new NextResponse("Certificate not found", { status: 404 })
    }

    return NextResponse.json(certificate)
  } catch (error) {
    console.error("Error fetching certificate:", error)
    return new NextResponse("Error fetching certificate", { status: 500 })
  }
}

