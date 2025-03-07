"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, CheckCircle, XCircle, Search } from "lucide-react"
import { verifyCertificate } from "@/utils/quries/getcourse"

export default function VerifyCertificatePage() {
  const searchParams = useSearchParams()
  const initialId = searchParams.get("id") || ""

  const [certificateId, setCertificateId] = useState(initialId)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean
    message: string
    certificate?: {
      id: string
      userName: string
      courseName: string
      issueDate: string
    }
  } | null>(null)

  const handleVerify = async () => {
    if (!certificateId) return

    setIsVerifying(true)
    try {
      const result = await verifyCertificate(certificateId)
      setVerificationResult(result)
    } catch (error) {
      setVerificationResult({
        isValid: false,
        message: "Failed to verify certificate. Please try again.",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  // Auto-verify if ID is in URL
  useState(() => {
    if (initialId) {
      handleVerify()
    }
  })

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Certificate Verification</h1>
          <p className="text-gray-500">Verify the authenticity of a course completion certificate</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Verify Certificate</CardTitle>
            <CardDescription>Enter the certificate ID to verify its authenticity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-6">
              <Input
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="Certificate ID"
                className="flex-1"
              />
              <Button onClick={handleVerify} disabled={isVerifying || !certificateId}>
                {isVerifying ? "Verifying..." : "Verify"}
                {!isVerifying && <Search className="ml-2 h-4 w-4" />}
              </Button>
            </div>

            {verificationResult && (
              <div
                className={`p-6 rounded-lg ${
                  verificationResult.isValid ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-start">
                  {verificationResult.isValid ? (
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
                  )}
                  <div>
                    <h3 className={`font-semibold ${verificationResult.isValid ? "text-green-800" : "text-red-800"}`}>
                      {verificationResult.isValid ? "Valid Certificate" : "Invalid Certificate"}
                    </h3>
                    <p className="mt-1">{verificationResult.message}</p>

                    {verificationResult.isValid && verificationResult.certificate && (
                      <div className="mt-4 p-4 bg-white rounded border">
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
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

