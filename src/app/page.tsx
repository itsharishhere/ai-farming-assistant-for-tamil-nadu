"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const farmerData = localStorage.getItem("farmerData")
    if (farmerData) {
      router.push("/dashboard")
    } else {
      router.push("/onboarding")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto" />
        <p className="mt-4 text-muted-foreground">Loading FarmAssist...</p>
      </div>
    </div>
  )
}