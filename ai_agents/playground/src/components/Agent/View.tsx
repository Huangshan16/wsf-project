"use client";

// import AudioVisualizer from "../audioVisualizer"
import type { IMicrophoneAudioTrack, IRemoteAudioTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import { useEffect } from "react";
import { useMultibandTrackVolume } from "@/common";
import AudioVisualizer from "@/components/Agent/AudioVisualizer";
import { cn } from "@/lib/utils";

export interface AgentViewProps {
  audioTrack?: IRemoteAudioTrack;
  videoTrack?: IRemoteVideoTrack;
}

export default function AgentView(props: AgentViewProps) {
  const { audioTrack, videoTrack } = props;

  const subscribedVolumes = useMultibandTrackVolume(audioTrack, 12);

  useEffect(() => {
    if (videoTrack) {
      const currentTrack = videoTrack;
      currentTrack.play(`remote-video-${currentTrack.getUserId()}`, { fit: "cover" });

      return () => {
        currentTrack.stop();
      };
    }
  }, [videoTrack?.getUserId()]);

  return (
    videoTrack ? (
      <div
        id={`remote-video-${videoTrack.getUserId()}`}
        className="relative w-full max-w-full overflow-hidden bg-[#e8daca]"
        style={{ minHeight: '240px', height: '240px', position: 'relative' }}
      >
      </div>
    ) : (
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center px-4",
          "bg-[#e8daca] bg-linear-to-br from-[rgba(242,184,128,0.45)] via-[rgba(232,218,202,0.55)] to-[#f4e8da] shadow-[0px_4px_40px_0px_rgba(107,142,110,0.18)] backdrop-blur-[7px]"
        )}
        style={{ minHeight: '240px', height: '240px' }}
      >
        <div className="mb-4 font-semibold text-[#EAECF0] text-lg">晓佑</div>
        <div className="h-20 w-full">
          <AudioVisualizer
            type="agent"
            frequencies={subscribedVolumes}
            barWidth={6}
            minBarHeight={6}
            maxBarHeight={80}
            borderRadius={2}
            gap={6}
          />
        </div>
      </div>
    )
  );
}
