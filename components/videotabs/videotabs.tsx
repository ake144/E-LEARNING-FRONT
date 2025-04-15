"use client"

import { useState } from "react"

import ResourcesSection from "./ResourcesSection"
import OverviewSection from "./overview"
import QASection from "./QAsection"
import { useCompletionStatus } from "@/utils/hooks/useCompletionStatus"
import CertificateSection from "../certeficate/certeficateSection"


type TabType = "overview" | "qa" | "resources" | "certificate"

interface CourseTabsProps {
    courseId: number;
    courseTitle: string;
    resources: {
      id: number;
      title: string;
      description: string;
      fileSize: string;
      dateAdded: string;
      url: string;
    }[];
  }
  
  export default function CourseTabs({ courseId, courseTitle, resources }: CourseTabsProps) {
    const [activeTab, setActiveTab] = useState<TabType>("overview");
    
    const  completionStatus  = useCompletionStatus(courseId);
    
    const renderTabContent = () => {
      switch (activeTab) {
        case "overview":
          return <OverviewSection courseId={courseId} courseTitle={courseTitle} />;
        case "qa":
          return <QASection courseId={courseId} />;
        case "resources":
          return <ResourcesSection courseId={courseId} resources={resources} />;
          case "certificate":
            return (
              <CertificateSection
                courseId={courseId}
                courseTitle={courseTitle}
                completionStatus={
                  completionStatus ?? {
                    totalLessons: 0,
                    completedLessons: 0,
                    isCompleted: false,
                  }
                }
              />
            )
        default:
          return <OverviewSection courseId={courseId} courseTitle={courseTitle} />;
      }
    };
  
    return (
      <div className="mt-6 bg-white rounded-lg shadow-lg">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 ${activeTab === "overview" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "qa" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("qa")}
          >
            Q&A
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "resources" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("resources")}
          >
            Resources
          </button>
          <button
          onClick={() => setActiveTab("certificate")}
          className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
            activeTab === "certificate"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Certificate
        </button>
        </div>
        <div className="p-6">{renderTabContent()}</div>
      </div>
    );
  }
  