"use client"

import * as React from "react"
import { useAppSelector, EMobileActiveTab } from "@/common"
import dynamic from "next/dynamic"

import Header from "@/components/Layout/Header"
import Action from "@/components/Layout/Action"
// import RTCCard from "@/components/Dynamic/RTCCard"
// import ChatCard from "@/components/Chat/ChatCard"
import AuthInitializer from "@/components/authInitializer"
import HealthMonitor from "@/components/Health/HealthMonitor"
import CompanionPanel from "@/components/Emotion/CompanionPanel"
import CompanionVoice from "@/components/Voice/CompanionVoice"
import QuickActions from "@/components/Common/QuickActions"
import { cn } from "@/lib/utils"

const DynamicRTCCard = dynamic(() => import("@/components/Dynamic/RTCCard"), {
  ssr: false,
})

const DynamicChatCard = dynamic(() => import("@/components/Chat/ChatCard"), {
  ssr: false,
})

export default function Home() {
  const mobileActiveTab = useAppSelector(
    (state) => state.global.mobileActiveTab,
  )

  const [currentEmotion, setCurrentEmotion] = React.useState<string | null>(null)

  const handleEmotionChange = (emotion: any) => {
    setCurrentEmotion(emotion.emotion)
  }

  return (
    <AuthInitializer>
      <div className="relative mx-auto flex h-full min-h-screen flex-col md:h-screen">
        <Header className="h-[60px]" />
        <Action className="h-[48px]" />
        <div className="mx-2 mb-2 flex h-full max-h-[calc(100vh-108px-24px)] flex-col lg:flex-row lg:gap-2">
          {/* Main Agent Interface */}
          <div className="flex flex-col md:flex-row gap-2 lg:flex-1">
            <DynamicRTCCard
              className={cn(
                "m-0 w-full rounded-b-lg bg-[#181a1d] md:w-[480px] md:rounded-lg",
                {
                  ["hidden md:block"]: mobileActiveTab === EMobileActiveTab.CHAT,
                },
              )}
            />
            <DynamicChatCard
              className={cn(
                "m-0 w-full rounded-b-lg bg-[#181a1d] md:rounded-lg",
                {
                  ["hidden md:block"]: mobileActiveTab === EMobileActiveTab.AGENT,
                },
              )}
            />
          </div>

          {/* Companion Features Sidebar */}
          <div className="hidden lg:flex lg:w-96 lg:flex-col lg:gap-2">
            <div className="grid grid-cols-2 gap-2">
              <HealthMonitor className="bg-[#181a1d]" />
              <QuickActions className="bg-[#181a1d]" />
            </div>
            <CompanionVoice className="bg-[#181a1d]" currentEmotion={currentEmotion} />
            <CompanionPanel className="bg-[#181a1d] flex-1" onEmotionChange={handleEmotionChange} />
          </div>

          {/* Mobile Companion Features */}
          <div className="lg:hidden space-y-2 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <HealthMonitor className="bg-[#181a1d]" />
              <QuickActions className="bg-[#181a1d]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <CompanionVoice className="bg-[#181a1d]" currentEmotion={currentEmotion} />
              <CompanionPanel className="bg-[#181a1d]" onEmotionChange={handleEmotionChange} />
            </div>
          </div>
        </div>
      </div>
    </AuthInitializer>
  )
}
