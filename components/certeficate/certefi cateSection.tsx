"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Award, Download, ExternalLink, CheckCircle, Share2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"
import { downloadCertificate, generateCertificate, verifyCertificate } from "@/utils/quries/getcourse"
import { number } from "zod"

interface CertificateSectionProps {
  courseId: number
  courseTitle: string
  completionStatus: {
    totalLessons: number
    completedLessons: number
    isCompleted: boolean
    certificateId?: string | number
  }
}

export default function CertificateSection({ courseId, courseTitle, completionStatus }: CertificateSectionProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [showCertificate, setShowCertificate] = useState(false)
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false)
  const [certificateIdToVerify, setCertificateIdToVerify] = useState("")
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean
    message: string
    certificate?: any
  } | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (showConfetti) {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [showConfetti])


  const {mutate:generateCert, isPending:isGenerating} = useMutation({
    mutationFn: async (data: { courseId: number; userId: string; userName: string; completionDate: string }) => {
      return generateCertificate(data); // Ensure generateCertificate is defined
    },
    onSuccess: () => {
      toast({ title: "Certificate generated", description: "Your certificate has been created successfully." });
      setShowCertificate(true);
      setShowConfetti(true);
      queryClient.invalidateQueries({ queryKey: ["certificate", courseId] }); // Correct invalidation
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate certificate. Please try again.",
        variant: "destructive",
      });
    },
  });

const {mutate:verifyCert, isPending:isVerifying} = useMutation({
    mutationFn:async (certificationId:string)=>{
      return verifyCertificate(certificationId);

    },
    onSuccess: (data) => {
      setVerificationResult(data)
    },

    onError: () => {
      setVerificationResult({ isValid: false, message: "Failed to verify certificate. Please try again." })
    },

})


  const handleGenerateCertificate = () => {
    if (session?.user) {
      generateCert({
        courseId,
        userId: session.user.id,
        userName: session.user.name || "Student",
        completionDate: new Date().toISOString(),
      })
    } else {
      toast({
        title: "Authentication required",
        description: "Please sign in to generate a certificate.",
        variant: "destructive",
      })
    }
  }

  const handleVerifyCertificate = () => {
    if (certificateIdToVerify) {
      verifyCert(certificateIdToVerify)
    }
  }

  const handleDownloadCertificate = () => {
    const certificateId = String(completionStatus.certificateId);
    if (certificateId){
      downloadCertificate(certificateId)
    }
    else {
      console.error("Invalid certificate ID:", certificateId);
    }
  }

  const handleShareCertificate = () => {
    const certificateId = String(completionStatus.certificateId);
    if (certificateId) {
      const url = `${window.location.origin}/verify-certificate?id=${completionStatus.certificateId}`

      if (navigator.share) {
        navigator
          .share({
            title: `${session?.user?.name}'s Certificate for ${courseTitle}`,
            text: "Check out my course completion certificate!",
            url,
          })
          .catch(() => {
            // Fallback if sharing fails
            navigator.clipboard.writeText(url)
            toast({ title: "Link copied", description: "Certificate verification link copied to clipboard" })
          })
      } else {
        navigator.clipboard.writeText(url)
        toast({ title: "Link copied", description: "Certificate verification link copied to clipboard" })
      }
    }
  }

  const completionPercentage = Math.round((completionStatus.completedLessons / completionStatus.totalLessons) * 100)
  console.log("Certificate ID:", completionStatus.certificateId, "Type:", typeof completionStatus.certificateId);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Course Completion Certificate</h2>

      <Card className="p-6 bg-gradient-to-br from-white to-blue-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Course Progress</h3>
              <p className="text-sm text-gray-500">Complete all lessons to earn your certificate</p>
            </div>
          </div>
          <div className="text-center md:text-right bg-white p-3 rounded-lg shadow-sm">
            <span className="text-3xl font-bold text-blue-600">{completionPercentage}%</span>
            <p className="text-sm text-gray-500">
              {completionStatus.completedLessons} of {completionStatus.totalLessons} lessons completed
            </p>
          </div>
        </div>

        <div className="relative w-full h-4 bg-gray-200 rounded-full mb-6 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>

        {completionStatus.isCompleted ? (
          <div className="space-y-4">
            <div className="flex items-center text-green-600 mb-4 bg-green-50 p-3 rounded-lg border border-green-100">
              <CheckCircle className="mr-2" />
              <span className="font-medium">Congratulations! You've completed this course.</span>
            </div>

            {completionStatus.certificateId ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Button
                  onClick={() => setShowCertificate(true)}
                  className="flex items-center bg-blue-600 hover:bg-blue-700"
                >
                  <Award className="mr-2 h-4 w-4" />
                  View Certificate
                </Button>
                <Button variant="outline" onClick={handleDownloadCertificate} className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" onClick={() => setVerifyDialogOpen(true)} className="flex items-center">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Verify
                </Button>
                <Button variant="outline" onClick={handleShareCertificate} className="flex items-center">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleGenerateCertificate}
                disabled={isGenerating}
                className="flex items-center bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              >
                <Award className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate Your Certificate"}
              </Button>
            )}
          </div>
        ) : (
          <div className="text-center p-6 border border-dashed rounded-lg bg-white">
            <Award className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="font-medium mb-2">Complete all lessons to earn your certificate</p>
            <p className="text-sm text-gray-500 mb-4">
              You need to complete {completionStatus.totalLessons - completionStatus.completedLessons} more lessons
            </p>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              {Array.from({ length: completionStatus.totalLessons }).map((_, i) => (
                <div
                  key={i}
                  className={`inline-block h-full w-[${100 / completionStatus.totalLessons}%] ${
                    i < completionStatus.completedLessons ? "bg-green-500" : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Certificate Dialog */}
      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Course Completion Certificate</DialogTitle>
          </DialogHeader>

          <div className="certificate-container border-8 border-double border-blue-200 p-8 bg-[url('/certificate-bg.jpg')] bg-cover bg-center">
            <div className="text-center relative z-10">
              <div className="absolute top-0 left-0 w-full h-full bg-white/80 -z-10 rounded-lg"></div>

              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-75 blur"></div>
                  <div className="relative bg-white rounded-full p-2">
                    <Award className="h-16 w-16 text-blue-600" />
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-serif mb-2 text-blue-900">Certificate of Completion</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>

              <p className="text-lg mb-6 text-gray-700">This certifies that</p>
              <p className="text-3xl font-bold mb-6 text-blue-800 font-serif">{session?.user?.name || "Student"}</p>
              <p className="text-lg mb-6 text-gray-700">has successfully completed the course</p>
              <p className="text-2xl font-bold mb-8 text-blue-800 font-serif">{courseTitle}</p>

              <div className="flex justify-between items-center mt-12 px-8">
                <div className="text-left">
                  <p className="text-sm text-gray-600">Date Issued</p>
                  <p className="font-medium text-blue-800">{new Date().toLocaleDateString()}</p>
                </div>
                <div className="h-px w-24 bg-blue-200"></div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Certificate ID</p>
                  <p className="font-medium text-blue-800">{String(completionStatus.certificateId)?.substring(0, 8)}</p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-blue-100">
                <p className="text-xs text-gray-500">
                  Verify this certificate at: {window.location.origin}/verify-certificate?id=
                  {completionStatus.certificateId}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={handleDownloadCertificate}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button onClick={() => setShowCertificate(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Verification Dialog */}
      <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Certificate</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Enter a certificate ID to verify its authenticity</p>
              <div className="flex space-x-2">
                <Input
                  value={certificateIdToVerify}
                  onChange={(e) => setCertificateIdToVerify(e.target.value)}
                  placeholder="Certificate ID"
                  defaultValue={completionStatus.certificateId}
                />
                <Button onClick={handleVerifyCertificate} disabled={isVerifying}>
                  {isVerifying ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </div>

            {verificationResult && (
              <div
                className={`p-4 rounded-lg ${verificationResult.isValid ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
              >
                <div className="flex items-center">
                  {verificationResult.isValid ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <span className="h-5 w-5 mr-2">❌</span>
                  )}
                  <p>{verificationResult.message}</p>
                </div>

                {verificationResult.isValid && verificationResult.certificate && (
                  <div className="mt-4 p-3 bg-white rounded border">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Certificate ID:</div>
                      <div>{verificationResult.certificate.id}</div>

                      <div className="text-gray-500">Recipient:</div>
                      <div>{verificationResult.certificate.userName}</div>

                      <div className="text-gray-500">Course:</div>
                      <div>{verificationResult.certificate.courseName}</div>

                      <div className="text-gray-500">Issue Date:</div>
                      <div>{new Date(verificationResult.certificate.issueDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

