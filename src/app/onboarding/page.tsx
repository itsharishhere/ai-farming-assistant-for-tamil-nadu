"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const TAMIL_NADU_CROPS = [
  "Rice (நெல்)",
  "Sugarcane (கரும்பு)",
  "Cotton (பருத்தி)",
  "Groundnut (நிலக்கடலை)",
  "Banana (வாழை)",
  "Coconut (தென்னை)",
  "Mango (மாம்பழம்)",
  "Turmeric (மஞ்சள்)",
  "Tapioca (மரவள்ளி)",
  "Chilli (மிளகாய்)"
]

const REGIONS = [
  "Cauvery Delta Zone",
  "North Eastern Zone",
  "North Western Zone",
  "Western Zone",
  "Southern Zone",
  "High Rainfall Zone",
  "Hill Zone"
]

const SOIL_TYPES = [
  "Red Soil (சிவப்பு மண்)",
  "Black Soil (கருப்பு மண்)",
  "Alluvial Soil (வண்டல் மண்)",
  "Laterite Soil (லேட்டரைட் மண்)",
  "Sandy Soil (மணல் மண்)",
  "Clay Soil (களிமண்)"
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    selectedCrops: [] as string[],
    region: "",
    soilType: "",
    acres: ""
  })

  const handleCropToggle = (crop: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCrops: prev.selectedCrops.includes(crop)
        ? prev.selectedCrops.filter(c => c !== crop)
        : [...prev.selectedCrops, crop]
    }))
  }

  const handleComplete = () => {
    // Save to localStorage
    localStorage.setItem("farmerData", JSON.stringify(formData))
    router.push("/dashboard")
  }

  const canProceed = () => {
    switch(step) {
      case 1: return formData.name.trim() !== ""
      case 2: return formData.selectedCrops.length > 0
      case 3: return formData.region !== "" && formData.soilType !== "" && formData.acres !== ""
      default: return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            {step === 1 && "Welcome to FarmAssist / வணக்கம்"}
            {step === 2 && "Select Your Crops / உங்கள் பயிர்களைத் தேர்ந்தெடுக்கவும்"}
            {step === 3 && "Farm Details / பண்ணை விவரங்கள்"}
          </CardTitle>
          <CardDescription className="text-center">
            Step {step} of 3
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name / உங்கள் பெயர்</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-2"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Label>Select Crops You Grow / நீங்கள் வளர்க்கும் பயிர்கள்</Label>
              <div className="grid grid-cols-2 gap-3">
                {TAMIL_NADU_CROPS.map((crop) => (
                  <button
                    key={crop}
                    onClick={() => handleCropToggle(crop)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.selectedCrops.includes(crop)
                        ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-200 hover:border-green-300 dark:border-gray-700"
                    }`}
                  >
                    <div className="font-medium text-sm">{crop}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="region">Agro-Climatic Zone / விவசாய காலநிலை மண்டலம்</Label>
                <Select value={formData.region} onValueChange={(value) => setFormData({...formData, region: value})}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((region) => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="soilType">Soil Type / மண் வகை</Label>
                <Select value={formData.soilType} onValueChange={(value) => setFormData({...formData, soilType: value})}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {SOIL_TYPES.map((soil) => (
                      <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="acres">Acres of Land / நிலத்தின் ஏக்கர்</Label>
                <Input
                  id="acres"
                  type="number"
                  placeholder="Enter acres"
                  value={formData.acres}
                  onChange={(e) => setFormData({...formData, acres: e.target.value})}
                  className="mt-2"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            {step < 3 ? (
              <Button 
                onClick={() => setStep(step + 1)} 
                disabled={!canProceed()}
                className="ml-auto"
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleComplete}
                disabled={!canProceed()}
                className="ml-auto bg-green-600 hover:bg-green-700"
              >
                Complete Setup
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
