"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EmotionState {
  emotion: "joy" | "sadness" | "anxiety" | "calm" | "energy" | "fatigue"
  intensity: number // 0-100
  confidence: number // 0-100
  timestamp: Date
}

interface EmotionDetectorProps {
  className?: string
  onEmotionChange?: (emotion: EmotionState) => void
}

export default function EmotionDetector(props: EmotionDetectorProps) {
  const { className, onEmotionChange } = props

  const [currentEmotion, setCurrentEmotion] = React.useState<EmotionState>({
    emotion: "calm",
    intensity: 65,
    confidence: 78,
    timestamp: new Date()
  })

  const [emotionHistory, setEmotionHistory] = React.useState<EmotionState[]>([])

  // Mock emotion detection - in real implementation, this would analyze voice, video, or text input
  React.useEffect(() => {
    const interval = setInterval(() => {
      // Simulate emotion changes based on random factors
      const emotions: EmotionState["emotion"][] = ["joy", "sadness", "anxiety", "calm", "energy", "fatigue"]
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)]
      const newEmotion: EmotionState = {
        emotion: randomEmotion,
        intensity: Math.floor(Math.random() * 40) + 40, // 40-80 range
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100 range
        timestamp: new Date()
      }

      setCurrentEmotion(newEmotion)
      setEmotionHistory(prev => [...prev.slice(-4), newEmotion]) // Keep last 5 emotions
      onEmotionChange?.(newEmotion)
    }, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [onEmotionChange])

  const getEmotionDisplay = (emotion: string) => {
    switch (emotion) {
      case "joy": return { text: "开心", emoji: "😊", color: "text-yellow-400" }
      case "sadness": return { text: "悲伤", emoji: "😢", color: "text-blue-400" }
      case "anxiety": return { text: "焦虑", emoji: "😰", color: "text-red-400" }
      case "calm": return { text: "平静", emoji: "😌", color: "text-green-400" }
      case "energy": return { text: "活力", emoji: "⚡", color: "text-orange-400" }
      case "fatigue": return { text: "疲倦", emoji: "😴", color: "text-gray-400" }
      default: return { text: "未知", emoji: "😐", color: "text-gray-400" }
    }
  }

  const getIntensityColor = (intensity: number) => {
    if (intensity > 80) return "text-red-400"
    if (intensity > 60) return "text-yellow-400"
    return "text-green-400"
  }

  const emotionDisplay = getEmotionDisplay(currentEmotion.emotion)

  return (
    <Card className={cn("p-4", className)}>
      <h3 className="text-lg font-semibold mb-4">情绪识别</h3>

      {/* Current Emotion */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{emotionDisplay.emoji}</span>
          <div>
            <p className={cn("font-medium", emotionDisplay.color)}>
              {emotionDisplay.text}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentEmotion.timestamp.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <Badge variant="outline" className="mb-1">
            强度 {currentEmotion.intensity}%
          </Badge>
          <p className="text-xs text-muted-foreground">
            置信度 {currentEmotion.confidence}%
          </p>
        </div>
      </div>

      {/* Emotion Trend */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">情绪趋势</p>
        <div className="flex space-x-1">
          {emotionHistory.slice(-5).map((emotion, index) => {
            const display = getEmotionDisplay(emotion.emotion)
            return (
              <div key={index} className="flex flex-col items-center text-xs">
                <span className="text-lg">{display.emoji}</span>
                <span className={cn("text-xs", display.color)}>
                  {emotion.intensity}%
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Emotion-based Suggestions */}
      <div className="mt-4 p-3 rounded-lg bg-secondary/30">
        <p className="text-sm font-medium mb-2">智能建议</p>
        <p className="text-xs text-muted-foreground">
          {currentEmotion.emotion === "anxiety" && "检测到您可能有些焦虑，建议进行深呼吸练习或听一些舒缓的音乐"}
          {currentEmotion.emotion === "sadness" && "感觉到您心情低落，我在这里陪伴您，有什么想聊的吗？"}
          {currentEmotion.emotion === "joy" && "看到您心情愉快真是太好了！保持这份美好的心情 ✨"}
          {currentEmotion.emotion === "calm" && "您现在很平静，这是很好的状态，适合做一些放松的活动"}
          {currentEmotion.emotion === "energy" && "感受到您的活力！这是开始新活动或完成任务的好时机"}
          {currentEmotion.emotion === "fatigue" && "您看起来有些疲倦，建议适当休息，保持充足睡眠"}
        </p>
      </div>
    </Card>
  )
}