"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import EmotionDetector from "./EmotionDetector"

interface CompanionMessage {
  type: "comfort" | "encouragement" | "reminder" | "question" | "emotion-response"
  message: string
  timestamp: Date
  emotion?: string
}

interface CompanionPanelProps {
  className?: string
  onEmotionChange?: (emotion: any) => void
}

export default function CompanionPanel(props: CompanionPanelProps) {
  const { className, onEmotionChange } = props

  const [companionMessages, setCompanionMessages] = React.useState<CompanionMessage[]>([
    {
      type: "comfort",
      message: "今天过得怎么样？我在这里陪伴您 💙",
      timestamp: new Date()
    }
  ])

  const [currentDetectedEmotion, setCurrentDetectedEmotion] = React.useState<any>(null)

  const companionSuggestions = [
    { type: "comfort", text: "我需要安慰", action: () => addCompanionMessage("别担心，一切都会好起来的。我会一直陪在您身边 🤗") },
    { type: "encouragement", text: "我需要鼓励", action: () => addCompanionMessage("您做得很棒！每一步努力都值得称赞，继续加油！ ✨") },
    { type: "reminder", text: "健康提醒", action: () => addCompanionMessage("该休息一下了，记得喝水、放松一下眼睛哦 💧") },
    { type: "question", text: "聊聊天", action: () => addCompanionMessage("想和我聊些什么呢？我很愿意听您分享今天的心情 😊") }
  ]

  const addCompanionMessage = (message: string, type: CompanionMessage["type"] = "comfort", emotion?: string) => {
    const newMessage: CompanionMessage = {
      type,
      message,
      timestamp: new Date(),
      emotion
    }
    setCompanionMessages(prev => [...prev, newMessage])
  }

  const handleEmotionChange = (emotion: any) => {
    setCurrentDetectedEmotion(emotion)
    onEmotionChange?.(emotion)

    // Auto-generate contextual companion messages based on detected emotion
    if (emotion.intensity > 70) {
      const emotionResponses = {
        anxiety: "我注意到您可能有些焦虑。让我们一起做几个深呼吸，我会陪着您 🫁",
        sadness: "感受到您的情绪变化，有什么想跟我分享的吗？我在这里倾听 👂",
        joy: "太好了！看到您开心我也很高兴 😊 让我们保持这份好心情",
        fatigue: "您似乎有些疲倦了，要不要休息一下？我可以播放一些轻松的音乐 🎵",
        energy: "感受到您的活力！这是做一些有趣事情的好时机 🚀"
      }

      const response = emotionResponses[emotion.emotion as keyof typeof emotionResponses]
      if (response) {
        setTimeout(() => {
          addCompanionMessage(response, "emotion-response", emotion.emotion)
        }, 2000)
      }
    }
  }

  const getMessageColor = (type: string) => {
    switch (type) {
      case "comfort": return "text-[hsl(var(--emotion-comfort))]"
      case "encouragement": return "text-[hsl(var(--emotion-happy))]"
      case "reminder": return "text-blue-400"
      case "question": return "text-[hsl(var(--emotion-calm))]"
      default: return "text-gray-400"
    }
  }

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "comfort": return "🤗"
      case "encouragement": return "✨"
      case "reminder": return "💡"
      case "question": return "💭"
      default: return "💙"
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Emotion Detection */}
      <EmotionDetector onEmotionChange={handleEmotionChange} />

      {/* Companion Messages */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">情感陪伴</h3>

      {/* Companion Messages */}
      <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
        {companionMessages.map((msg, index) => (
          <div key={index} className="flex items-start space-x-2">
            <span className="text-lg">{getMessageIcon(msg.type)}</span>
            <div className="flex-1">
              <p className={cn("text-sm", getMessageColor(msg.type))}>
                {msg.message}
              </p>
              <span className="text-xs text-muted-foreground">
                {msg.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground mb-2">快速陪伴</p>
        <div className="grid grid-cols-2 gap-2">
          {companionSuggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={suggestion.action}
              className="text-xs h-auto py-2 px-3 whitespace-normal text-left"
            >
              {suggestion.text}
            </Button>
          ))}
        </div>
      </div>

      {/* Mood Check */}
      <div className="mt-4 p-3 rounded-lg bg-secondary/30">
        <p className="text-sm text-muted-foreground mb-2">今日心情如何？</p>
        <div className="flex space-x-2">
          {["😊", "😌", "😐", "😔", "😰"].map((emoji, index) => (
            <button
              key={index}
              className="text-xl hover:scale-110 transition-transform"
              onClick={() => {
                const moods = ["很开心", "平静", "一般", "有点难过", "焦虑"]
                addCompanionMessage(`我理解您现在${moods[index]}的心情，${
                  index < 2 ? "很高兴看到您心情不错！" :
                  index === 2 ? "有什么我可以帮助您的吗？" :
                  "让我陪您聊聊，也许会感觉好一些 💙"
                }`, "comfort")
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </Card>
    </div>
  )
}