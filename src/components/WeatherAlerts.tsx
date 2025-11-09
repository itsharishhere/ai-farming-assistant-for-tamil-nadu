"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Cloud, CloudRain, Sun, Wind, AlertTriangle } from "lucide-react"

export default function WeatherAlerts() {
  const alerts = [
    {
      type: "warning",
      title: "Heavy Rainfall Expected",
      description: "Moderate to heavy rainfall expected in next 48 hours. Postpone pesticide application.",
      icon: CloudRain,
      color: "text-orange-600"
    },
    {
      type: "info",
      title: "Temperature Rise",
      description: "Temperature may reach 35°C this week. Increase irrigation frequency.",
      icon: Sun,
      color: "text-yellow-600"
    },
    {
      type: "alert",
      title: "Pest Alert",
      description: "High humidity conditions favorable for leaf blight. Monitor crops closely.",
      icon: AlertTriangle,
      color: "text-red-600"
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          Weather & Alerts / வானிலை எச்சரிக்கைகள்
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert, index) => {
          const Icon = alert.icon
          return (
            <Alert key={index} className="border-l-4 border-l-primary">
              <Icon className={`h-4 w-4 ${alert.color}`} />
              <AlertDescription>
                <p className="font-semibold text-sm">{alert.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
              </AlertDescription>
            </Alert>
          )
        })}
      </CardContent>
    </Card>
  )
}
