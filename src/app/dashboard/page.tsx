"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AIAssistant from "@/components/AIAssistant"
import ActivityTracker from "@/components/ActivityTracker"
import WeatherAlerts from "@/components/WeatherAlerts"
import IrrigationScheduler from "@/components/IrrigationScheduler"
import { Button } from "@/components/ui/button"
import { LogOut, Sprout } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [farmerData, setFarmerData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const data = localStorage.getItem("farmerData")
    if (!data) {
      router.push("/onboarding")
    } else {
      setFarmerData(JSON.parse(data))
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout? This will clear all your data.")) {
      localStorage.clear()
      router.push("/onboarding")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sprout className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-2xl font-bold">FarmAssist</h1>
              <p className="text-sm text-muted-foreground">Welcome, {farmerData?.name}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Farmer Info Summary */}
        <div className="mb-6 p-4 bg-white dark:bg-gray-950 rounded-lg border shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Crops</p>
              <p className="font-medium">{farmerData?.selectedCrops?.join(", ")}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Region</p>
              <p className="font-medium">{farmerData?.region}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Soil Type</p>
              <p className="font-medium">{farmerData?.soilType}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Land Size</p>
              <p className="font-medium">{farmerData?.acres} acres</p>
            </div>
          </div>
        </div>

        {/* AI Assistant - Full Width at Top */}
        <div className="mb-6">
          <AIAssistant farmerData={farmerData} />
        </div>

        {/* Grid Layout for Other Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Tracker */}
          <ActivityTracker cropData={farmerData} />

          {/* Weather Alerts */}
          <WeatherAlerts />

          {/* Irrigation Scheduler - Full Width */}
          <div className="lg:col-span-2">
            <IrrigationScheduler farmerData={farmerData} />
          </div>
        </div>
      </main>
    </div>
  )
}
