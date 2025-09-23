"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface QuickActionsProps {
  className?: string
}

export default function QuickActions(props: QuickActionsProps) {
  const { className } = props

  const quickActions = [
    {
      icon: "🩺",
      label: "健康检查",
      action: () => console.log("Starting health check"),
      description: "开始健康状态检测"
    },
    {
      icon: "💬",
      label: "情感支持",
      action: () => console.log("Starting emotional support"),
      description: "需要情感陪伴和支持"
    },
    {
      icon: "🔔",
      label: "提醒设置",
      action: () => console.log("Setting reminders"),
      description: "设置健康提醒和任务"
    },
    {
      icon: "📞",
      label: "紧急联系",
      action: () => console.log("Emergency contact"),
      description: "联系紧急联系人"
    },
    {
      icon: "🎵",
      label: "放松音乐",
      action: () => console.log("Playing relaxing music"),
      description: "播放舒缓放松音乐"
    },
    {
      icon: "📝",
      label: "心情日记",
      action: () => console.log("Opening mood diary"),
      description: "记录今日心情和感受"
    }
  ]

  return (
    <Card className={cn("p-4", className)}>
      <h3 className="text-lg font-semibold mb-4">快捷操作</h3>

      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={action.action}
            className="h-auto flex-col p-3 space-y-1 hover:bg-accent/50"
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-xs font-medium">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Emergency Button */}
      <div className="mt-4 pt-4 border-t">
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => console.log("Emergency action")}
        >
          🚨 紧急求助
        </Button>
      </div>

      {/* Daily Care Reminder */}
      <div className="mt-4 p-3 rounded-lg bg-primary/10">
        <p className="text-sm text-center text-muted-foreground">
          💝 今天也要好好照顾自己哦
        </p>
      </div>
    </Card>
  )
}