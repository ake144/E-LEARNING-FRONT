"use client";

import { FileText, Download, ExternalLink, File } from "lucide-react";

interface ResourcesSectionProps {
  courseId: number;
  resources: {
    id: number;
    title: string;
    description: string;
    fileSize: string;
    dateAdded: string;
    url: string;
  }[];
}

export default function ResourcesSection({ courseId, resources }: ResourcesSectionProps) {
  if (!resources || resources.length === 0) {
    return <p className="text-gray-500">No resources available for this course.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Course PDF Resources</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors"
          >
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <FileText size={24} className="text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg">{resource.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                  <span>{resource.fileSize}</span>
                  <span>Added: {resource.dateAdded}</span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <a
                    href={resource.url}
                    className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={14} className="mr-1" /> View
                  </a>
                  <a
                    href={resource.url}
                    className="flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                    download
                  >
                    <Download size={14} className="mr-1" /> Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <File size={20} className="text-blue-600 mr-2" />
          <h3 className="font-medium">Need additional resources?</h3>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          If you need any additional materials or have specific resource requests, please contact your instructor or post a question in the Q&A section.
        </p>
      </div>
    </div>
  );
}
