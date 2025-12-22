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
        className="relative w-full overflow-hidden bg-[#121212]"
        style={{ minHeight: '240px', height: '240px', position: 'relative' }}
      >
      </div>
    ) : (
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center px-4",
          "bg-[#121212] bg-linear-to-br from-[rgba(31,255,212,0.18)] via-[rgba(18,18,18,0.00)] to-[#0b1f1b] shadow-[0px_4px_40px_0px_rgba(31,255,212,0.12)] backdrop-blur-[7px]"
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
