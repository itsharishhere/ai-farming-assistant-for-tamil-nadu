"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Droplets } from "lucide-react"

interface IrrigationData {
  cropType: string
  soilType: string
  lastIrrigation: string
  nextIrrigation: string
  acres: string
}

const IRRIGATION_INTERVALS: Record<string, Record<string, number>> = {
  "Rice (நெல்)": {
    "Red Soil (சிவப்பு மண்)": 3,
    "Black Soil (கருப்பு மண்)": 4,
    "Alluvial Soil (வண்டல் மண்)": 3,
    "default": 3
  },
  "Sugarcane (கரும்பு)": {
    "Red Soil (சிவப்பு மண்)": 7,
    "Black Soil (கருப்பு மண்)": 8,
    "Sandy Soil (மணல் மண்)": 5,
    "default": 7
  },
  "Cotton (பருத்தி)": {
    "Red Soil (சிவப்பு மண்)": 7,
    "Black Soil (கருப்பு மண்)": 10,
    "default": 7
  },
  "default": {
    "default": 5
  }
}

export default function IrrigationScheduler({ farmerData }: { farmerData?: any }) {
  const [irrigationData, setIrrigationData] = useState<IrrigationData>({
    cropType: farmerData?.selectedCrops?.[0] || "",
    soilType: farmerData?.soilType || "",
    lastIrrigation: "",
    nextIrrigation: "",
    acres: farmerData?.acres || ""
  })

  useEffect(() => {
    const saved = localStorage.getItem("irrigationData")
    if (saved) {
      setIrrigationData(JSON.parse(saved))
    }
  }, [])

  const calculateNextIrrigation = () => {
    if (!irrigationData.lastIrrigation) return

    const cropIntervals = IRRIGATION_INTERVALS[irrigationData.cropType] || IRRIGATION_INTERVALS["default"]
    const daysToAdd = cropIntervals[irrigationData.soilType] || cropIntervals["default"]

    const lastDate = new Date(irrigationData.lastIrrigation)
    const nextDate = new Date(lastDate)
    nextDate.setDate(nextDate.getDate() + daysToAdd)

    const nextIrrigationDate = nextDate.toISOString().split('T')[0]
    
    const updated = { ...irrigationData, nextIrrigation: nextIrrigationDate }
    setIrrigationData(updated)
    localStorage.setItem("irrigationData", JSON.stringify(updated))
  }

  const handleSave = () => {
    calculateNextIrrigation()
  }

  const getDaysUntilNext = () => {
    if (!irrigationData.nextIrrigation) return null

    const today = new Date()
    const next = new Date(irrigationData.nextIrrigation)
    const diffTime = next.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays
  }

  const daysUntilNext = getDaysUntilNext()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-600" />
          Irrigation Scheduler / பாசன அட்டவணை
        </CardTitle>
        <CardDescription>
          Track and schedule your irrigation based on crop and soil type
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="crop">Crop Type</Label>
            <Select
              value={irrigationData.cropType}
              onValueChange={(value) => setIrrigationData({ ...irrigationData, cropType: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                {farmerData?.selectedCrops?.map((crop: string) => (
                  <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="soil">Soil Type</Label>
            <Input
              id="soil"
              value={irrigationData.soilType}
              readOnly
              className="mt-2 bg-muted"
            />
          </div>

          <div>
            <Label htmlFor="lastIrrigation">Last Irrigation Date</Label>
            <Input
              id="lastIrrigation"
              type="date"
              value={irrigationData.lastIrrigation}
              onChange={(e) => setIrrigationData({ ...irrigationData, lastIrrigation: e.target.value })}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="acres">Acres</Label>
            <Input
              id="acres"
              type="number"
              value={irrigationData.acres}
              onChange={(e) => setIrrigationData({ ...irrigationData, acres: e.target.value })}
              className="mt-2"
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Calculate Next Irrigation
        </Button>

        {irrigationData.nextIrrigation && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold">Next Irrigation Schedule</h4>
            </div>
            <p className="text-sm">
              <span className="font-medium">Date:</span> {new Date(irrigationData.nextIrrigation).toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            {daysUntilNext !== null && (
              <p className="text-sm mt-1">
                <span className="font-medium">
                  {daysUntilNext > 0 ? `In ${daysUntilNext} days` : daysUntilNext === 0 ? "Today" : `${Math.abs(daysUntilNext)} days overdue`}
                </span>
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Based on {irrigationData.cropType} growing in {irrigationData.soilType}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
