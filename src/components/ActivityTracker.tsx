"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"

interface Activity {
  id: string
  task: string
  completed: boolean
  date: string
}

interface ActivityTrackerProps {
  cropData?: any
}

const CROP_ACTIVITIES: Record<string, string[]> = {
  "Rice (நெல்)": [
    "Land preparation and ploughing",
    "Seed selection and treatment",
    "Nursery preparation",
    "Transplanting seedlings",
    "First irrigation after transplanting",
    "First fertilizer application (Urea)",
    "Weed management",
    "Pest monitoring and control",
    "Second fertilizer application",
    "Flowering stage monitoring",
    "Pre-harvest irrigation stop",
    "Harvesting"
  ],
  "Sugarcane (கரும்பு)": [
    "Field preparation and deep ploughing",
    "Sett treatment with fungicide",
    "Planting in furrows",
    "First irrigation",
    "Gap filling after germination",
    "First earthing up",
    "Fertilizer application",
    "Weed control",
    "Pest and disease monitoring",
    "Trash mulching",
    "Second earthing up",
    "Harvesting"
  ],
  "Cotton (பருத்தி)": [
    "Land preparation",
    "Seed treatment",
    "Sowing",
    "Pre-emergence irrigation",
    "Gap filling",
    "First weeding",
    "Fertilizer application",
    "Pest scouting",
    "Flowering stage care",
    "Boll formation monitoring",
    "Harvesting - First picking",
    "Harvesting - Second picking"
  ]
}

export default function ActivityTracker({ cropData }: ActivityTrackerProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [newTask, setNewTask] = useState("")

  useEffect(() => {
    // Load activities from localStorage
    const saved = localStorage.getItem("farmActivities")
    if (saved) {
      setActivities(JSON.parse(saved))
    } else {
      // Initialize with crop-specific tasks
      initializeActivities()
    }
  }, [])

  const initializeActivities = () => {
    const selectedCrops = cropData?.selectedCrops || []
    let tasks: string[] = []

    selectedCrops.forEach((crop: string) => {
      if (CROP_ACTIVITIES[crop]) {
        tasks = [...tasks, ...CROP_ACTIVITIES[crop]]
      }
    })

    // If no specific crops, add general tasks
    if (tasks.length === 0) {
      tasks = [
        "Soil preparation",
        "Seed selection",
        "Planting/Sowing",
        "Irrigation setup",
        "Fertilizer application",
        "Weed control",
        "Pest monitoring",
        "Harvesting"
      ]
    }

    const initialActivities = tasks.map((task, index) => ({
      id: `task-${index}`,
      task,
      completed: false,
      date: new Date().toISOString()
    }))

    setActivities(initialActivities)
    localStorage.setItem("farmActivities", JSON.stringify(initialActivities))
  }

  const toggleActivity = (id: string) => {
    const updated = activities.map(activity =>
      activity.id === id ? { ...activity, completed: !activity.completed } : activity
    )
    setActivities(updated)
    localStorage.setItem("farmActivities", JSON.stringify(updated))
  }

  const addActivity = () => {
    if (!newTask.trim()) return

    const newActivity: Activity = {
      id: `task-${Date.now()}`,
      task: newTask,
      completed: false,
      date: new Date().toISOString()
    }

    const updated = [...activities, newActivity]
    setActivities(updated)
    localStorage.setItem("farmActivities", JSON.stringify(updated))
    setNewTask("")
  }

  const deleteActivity = (id: string) => {
    const updated = activities.filter(activity => activity.id !== id)
    setActivities(updated)
    localStorage.setItem("farmActivities", JSON.stringify(updated))
  }

  const completedCount = activities.filter(a => a.completed).length
  const progress = activities.length > 0 ? (completedCount / activities.length) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Farm Activity Timeline / செயல்பாடுகள்</CardTitle>
        <CardDescription>
          Track your farming activities and progress
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Farm Progress</span>
            <span className="font-semibold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {completedCount} of {activities.length} tasks completed
          </p>
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                checked={activity.completed}
                onCheckedChange={() => toggleActivity(activity.id)}
              />
              <span className={`flex-1 text-sm ${activity.completed ? "line-through text-muted-foreground" : ""}`}>
                {activity.task}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteActivity(activity.id)}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Input
            placeholder="Add new activity..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addActivity()}
          />
          <Button onClick={addActivity}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
