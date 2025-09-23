"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface VoiceInteractionProps {
  className?: string
  currentEmotion?: string | null
}

export default function CompanionVoice(props: VoiceInteractionProps) {
  const { className, currentEmotion } = props

  const [isListening, setIsListening] = React.useState(false)
  const [isSpeaking, setIsSpeaking] = React.useState(false)
  const [voiceMode, setVoiceMode] = React.useState<"proactive" | "responsive">("responsive")

  const companionPrompts = [
    "您好，我是您的陪护助手，有什么需要帮助的吗？",
    "今天感觉怎么样？愿意和我聊聊吗？",
    "我注意到您可能需要一些陪伴，我在这里",
    "让我们一起聊聊天，分享一下今天的心情吧",
  ]

  const emotionBasedPrompts = {
    anxiety: [
      "我感觉到您可能有些紧张，让我们一起做个深呼吸练习吧",
      "焦虑是正常的情绪，我们可以通过聊天来缓解一下",
      "要不要我为您播放一些舒缓的音乐？"
    ],
    sadness: [
      "我在这里陪伴您，有什么想分享的吗？",
      "虽然现在心情不太好，但请记住我会一直在您身边",
      "有时候倾诉能让心情好一些，我很愿意倾听"
    ],
    joy: [
      "看到您开心我也很高兴！",
      "这份快乐很珍贵，让我们一起保持下去",
      "愿意分享一下是什么让您这么开心吗？"
    ],
    fatigue: [
      "您看起来有些累了，要不要休息一下？",
      "累的时候就要好好休息，我可以播放一些轻松的内容",
      "保持充足睡眠很重要，让我提醒您注意休息"
    ]
  }

  const getContextualPrompt = () => {
    if (currentEmotion && emotionBasedPrompts[currentEmotion as keyof typeof emotionBasedPrompts]) {
      const prompts = emotionBasedPrompts[currentEmotion as keyof typeof emotionBasedPrompts]
      return prompts[Math.floor(Math.random() * prompts.length)]
    }
    return companionPrompts[Math.floor(Math.random() * companionPrompts.length)]
  }

  const handleProactivePrompt = () => {
    setIsSpeaking(true)
    const prompt = getContextualPrompt()
    console.log("Speaking:", prompt)

    // Simulate speaking duration
    setTimeout(() => {
      setIsSpeaking(false)
    }, 3000)
  }

  const handleListeningToggle = () => {
    setIsListening(!isListening)
  }

  return (
    <Card className={cn("p-4", className)}>
      <h3 className="text-lg font-semibold mb-4">语音交互</h3>

      {/* Voice Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Badge variant={isListening ? "default" : "outline"}>
            {isListening ? "🎙️ 正在倾听" : "🔇 待机中"}
          </Badge>
          <Badge variant={isSpeaking ? "default" : "outline"}>
            {isSpeaking ? "🗣️ 正在陪伴" : "🤐 静音"}
          </Badge>
        </div>
      </div>

      {/* Voice Mode Toggle */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-2">交互模式</p>
        <div className="flex space-x-2">
          <Button
            variant={voiceMode === "responsive" ? "default" : "outline"}
            size="sm"
            onClick={() => setVoiceMode("responsive")}
            className="flex-1"
          >
            响应模式
          </Button>
          <Button
            variant={voiceMode === "proactive" ? "default" : "outline"}
            size="sm"
            onClick={() => setVoiceMode("proactive")}
            className="flex-1"
          >
            主动陪伴
          </Button>
        </div>
      </div>

      {/* Voice Controls */}
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleListeningToggle}
          className={cn("w-full", {
            "border-primary text-primary": isListening
          })}
        >
          {isListening ? "停止倾听" : "开始倾听"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleProactivePrompt}
          disabled={isSpeaking}
          className="w-full"
        >
          {isSpeaking ? "正在陪伴中..." : "主动关怀"}
        </Button>
      </div>

      {/* Voice Settings */}
      <div className="mt-4 p-3 rounded-lg bg-secondary/30">
        <p className="text-sm font-medium mb-2">语音特性</p>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>• 情绪感知响应</p>
          <p>• 个性化关怀语调</p>
          <p>• 主动陪伴对话</p>
          <p>• 实时情感识别</p>
        </div>
      </div>

      {/* Current Context */}
      {currentEmotion && (
        <div className="mt-3 p-2 rounded bg-accent/20">
          <p className="text-xs text-muted-foreground">
            当前情绪: <span className="text-accent font-medium">{currentEmotion}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            已调整语音交互策略以匹配您的情绪状态
          </p>
        </div>
      )}
    </Card>
  )
}