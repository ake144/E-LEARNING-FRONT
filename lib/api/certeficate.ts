interface GenerateCertificateParams {
    courseId: number
    userId: string
    userName: string
    completionDate: string
  }
  
  export async function generateCertificate(data: GenerateCertificateParams) {
    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
  
      if (!response.ok) {
        throw new Error("Failed to generate certificate")
      }
  
      return await response.json()
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to generate certificate")
    }
  }
  
  interface VerifyCertificateParams {
    certificateId: string
  }
  
  export async function verifyCertificate(data: VerifyCertificateParams) {
    try {
      const response = await fetch(`/api/certificates/verify?id=${data.certificateId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      if (!response.ok) {
        throw new Error("Failed to verify certificate")
      }
  
      return await response.json()
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to verify certificate")
    }
  }
  
  