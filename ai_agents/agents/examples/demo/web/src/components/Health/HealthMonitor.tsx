"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface HealthMetrics {
  heartRate: number
  temperature: number
  bloodPressure: { systolic: number; diastolic: number }
  mood: "calm" | "happy" | "stressed" | "tired"
}

export default function HealthMonitor(props: { className?: string }) {
  const { className } = props

  // Mock health data - in real implementation, this would come from actual sensors/API
  const [healthMetrics, setHealthMetrics] = React.useState<HealthMetrics>({
    heartRate: 72,
    temperature: 36.5,
    bloodPressure: { systolic: 120, diastolic: 80 },
    mood: "calm"
  })

  const getHeartRateStatus = (hr: number) => {
    if (hr < 60 || hr > 100) return "text-red-400"
    if (hr < 70 || hr > 90) return "text-yellow-400"
    return "text-green-400"
  }

  const getTemperatureStatus = (temp: number) => {
    if (temp < 36.1 || temp > 37.2) return "text-red-400"
    if (temp < 36.3 || temp > 37.0) return "text-yellow-400"
    return "text-green-400"
  }

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "happy": return "text-[hsl(var(--emotion-happy))]"
      case "calm": return "text-[hsl(var(--emotion-calm))]"
      case "stressed": return "text-red-400"
      case "tired": return "text-yellow-400"
      default: return "text-gray-400"
    }
  }

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "happy": return "😊"
      case "calm": return "😌"
      case "stressed": return "😰"
      case "tired": return "😴"
      default: return "😐"
    }
  }

  return (
    <Card className={cn("p-4", className)}>
      <h3 className="text-lg font-semibold mb-4">健康监测</h3>

      <div className="space-y-4">
        {/* Heart Rate */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">心率</span>
          <div className="flex items-center space-x-2">
            <span className={cn("text-sm font-medium", getHeartRateStatus(healthMetrics.heartRate))}>
              {healthMetrics.heartRate}
            </span>
            <span className="text-xs text-muted-foreground">bpm</span>
          </div>
        </div>

        {/* Temperature */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">体温</span>
          <div className="flex items-center space-x-2">
            <span className={cn("text-sm font-medium", getTemperatureStatus(healthMetrics.temperature))}>
              {healthMetrics.temperature}
            </span>
            <span className="text-xs text-muted-foreground">°C</span>
          </div>
        </div>

        {/* Blood Pressure */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">血压</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-green-400">
              {healthMetrics.bloodPressure.systolic}/{healthMetrics.bloodPressure.diastolic}
            </span>
            <span className="text-xs text-muted-foreground">mmHg</span>
          </div>
        </div>

        {/* Mood */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">情绪状态</span>
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getMoodEmoji(healthMetrics.mood)}</span>
            <span className={cn("text-sm font-medium", getMoodColor(healthMetrics.mood))}>
              {healthMetrics.mood === "calm" ? "平静" :
               healthMetrics.mood === "happy" ? "愉快" :
               healthMetrics.mood === "stressed" ? "紧张" : "疲倦"}
            </span>
          </div>
        </div>
      </div>

      {/* Health Status Summary */}
      <div className="mt-4 p-3 rounded-lg bg-secondary/50">
        <p className="text-sm text-muted-foreground">
          当前健康状态良好，建议保持规律作息 💙
        </p>
      </div>
    </Card>
  )
}