"use client"

import { useState } from "react"
import { Search, CheckCircle, HelpCircle } from "lucide-react"

interface QASectionProps {
  courseId: number
}

export default function QASection({ courseId }: QASectionProps) {
  const [activeSection, setActiveSection] = useState<"quizzes" | "questions">("quizzes")

  // Sample quizzes data - would typically be fetched from an API
  const quizzes = [
    {
      id: 1,
      title: "Module 1 Assessment",
      questionsCount: 10,
      timeLimit: "20 minutes",
      completed: true,
      score: "8/10",
    },
    {
      id: 2,
      title: "Module 2 Assessment",
      questionsCount: 15,
      timeLimit: "30 minutes",
      completed: false,
      score: null,
    },
    {
      id: 3,
      title: "Final Course Assessment",
      questionsCount: 25,
      timeLimit: "45 minutes",
      completed: false,
      score: null,
    },
  ]

  // Sample questions data - would typically be fetched from an API
  const questions = [
    {
      id: 1,
      user: "John Doe",
      title: "How do I implement the concept from lesson 3?",
      date: "2023-12-10",
      replies: 2,
      answered: true,
    },
    {
      id: 2,
      user: "Jane Smith",
      title: "Clarification needed on the example in module 2",
      date: "2023-12-05",
      replies: 1,
      answered: true,
    },
    {
      id: 3,
      user: "Alex Johnson",
      title: "Error when trying to complete the exercise",
      date: "2023-12-01",
      replies: 0,
      answered: false,
    },
  ]

  return (
    <div>
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveSection("quizzes")}
          className={`px-4 py-2 font-medium ${
            activeSection === "quizzes" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
        >
          Quizzes & Assessments
        </button>
        <button
          onClick={() => setActiveSection("questions")}
          className={`px-4 py-2 font-medium ${
            activeSection === "questions" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
        >
          Questions & Answers
        </button>
      </div>

      {activeSection === "quizzes" ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">Course Quizzes</h3>
          <div className="space-y-4">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-lg">{quiz.title}</h4>
                  {quiz.completed ? (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                      <CheckCircle size={14} className="mr-1" /> Completed
                    </span>
                  ) : (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Available
                    </span>
                  )}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <p>
                    {quiz.questionsCount} questions • {quiz.timeLimit}
                  </p>
                  {quiz.score && <p className="mt-1 font-medium">Your score: {quiz.score}</p>}
                </div>
                <div className="mt-4">
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      quiz.completed
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {quiz.completed ? "Review Quiz" : "Start Quiz"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Course Questions</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              Ask a Question
            </button>
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search questions"
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
              <Search size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {questions.map((question) => (
              <div
                key={question.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{question.title}</h4>
                  {question.answered ? (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                      <CheckCircle size={14} className="mr-1" /> Answered
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                      <HelpCircle size={14} className="mr-1" /> Unanswered
                    </span>
                  )}
                </div>
                <div className="mt-2 text-sm text-gray-600 flex justify-between">
                  <span>Posted by: {question.user}</span>
                  <span>{question.date}</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <span>
                    {question.replies} {question.replies === 1 ? "reply" : "replies"}
                  </span>
                </div>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
                    View Discussion
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

