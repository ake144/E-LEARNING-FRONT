"use client"

import React from "react"


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Marquee } from "./ui/marquee"

const reviews = [
  {
    name: "Sarah Johnson",
    username: "@sarahj",
    body: "This profile generator has revolutionized my job search. I've received more interview requests than ever before!",
    img: "/placeholder.svg?height=80&width=80",
    role: "Software Engineer"
  },
  {
    name: "Michael Chen",
    username: "@mikechen",
    body: "The ability to export my profile in multiple formats has made it incredibly easy to apply for roles across different platforms.",
    img: "/placeholder.svg?height=80&width=80",
    role: "UX Designer"
  },
  {
    name: "Emily Rodriguez",
    username: "@emrod",
    body: "The AI-powered insights have helped me optimize my profile. I'm now attracting opportunities that truly align with my skills.",
    img: "/placeholder.svg?height=80&width=80",
    role: "Data Scientist"
  },
  {
    name: "Alex Thompson",
    username: "@alexthom",
    body: "The seamless integrations with other apps have streamlined my entire job application process. It's a game-changer!",
    img: "/placeholder.svg?height=80&width=80",
    role: "Product Manager"
  },
  {
    name: "Olivia Parker",
    username: "@oliviap",
    body: "As a freelancer, having a centralized profile that I can easily customize for different clients has been invaluable.",
    img: "/placeholder.svg?height=80&width=80",
    role: "Freelance Writer"
  },
  {
    name: "David Kim",
    username: "@davidk",
    body: "The analytics dashboard gives me great insights into how recruiters are interacting with my profile. It's helped me refine my approach.",
    img: "/placeholder.svg?height=80&width=80",
    role: "Marketing Specialist"
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
  img,
  name,
  username,
  body,
  role,
}: {
  img: string
  name: string
  username: string
  body: string
  role: string
}) => {
  return (
    <Card className="w-[350px] mx-4 my-6 bg-background/80 backdrop-blur-sm hover:bg-accent transition-colors duration-300">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={img} alt={name} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{username}</p>
          </div>
          <Badge variant="secondary" className="ml-auto">
            {role}
          </Badge>
        </div>
        <blockquote className="text-sm italic">{body}</blockquote>
      </CardContent>
    </Card>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Loved by Many
        </h2>
        <p className="text-base text-center  mb-16 max-w-2xl mx-auto">
          Join thousands of professionals who have transformed their careers with our intelligent profile generator.
        </p>
        <div className="relative w-full overflow-hidden">
          <Marquee className="py-4" pauseOnHover speed={20}>
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee className="py-4" pauseOnHover speed={20} reverse>
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </section>
  )
}
