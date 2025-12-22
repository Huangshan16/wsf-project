import type {
  ColorItem,
  GraphOptionItem,
  IOptions,
  ITrulienceSettings,
  LanguageOptionItem,
  VoiceOptionItem,
} from "@/types";
export const GITHUB_URL = "https://github.com/TEN-framework/TEN-Agent";
export const OPTIONS_KEY = "__options__";
export const DEFAULT_OPTIONS: IOptions = {
  channel: "",
  userName: "",
  userId: 0,
  appId: "",
  token: "",
};
export const DESCRIPTION =
  "晓佑（Xiao You）是一位基于尖端人工智能与深度学习技术打造的居家智能陪护助手。她不是替代人类情感连接，而是提供补充性的支持、信息与温和陪伴。";
export const LANGUAGE_OPTIONS: LanguageOptionItem[] = [
  {
    label: "英语",
    value: "en-US",
  },
  {
    label: "中文（简体）",
    value: "zh-CN",
  },
  {
    label: "韩语",
    value: "ko-KR",
  },
  {
    label: "日语",
    value: "ja-JP",
  },
];
export const GRAPH_OPTIONS: GraphOptionItem[] = [
  {
    label: "语音助手 - OpenAI LLM + Azure TTS",
    value: "va_openai_azure",
  },
  {
    label: "语音助手（含视觉）- OpenAI LLM + Azure TTS",
    value: "camera_va_openai_azure",
  },
  //{
  //  label: "Voice Agent with Knowledge - RAG + Qwen LLM + Cosy TTS",
  //  value: "va_qwen_rag"
  // },
];

export const isRagGraph = (graphName: string) => {
  return graphName === "va_qwen_rag";
};

export const VOICE_OPTIONS: VoiceOptionItem[] = [
  {
    label: "男声",
    value: "male",
  },
  {
    label: "女声",
    value: "female",
  },
];

export enum VideoSourceType {
  CAMERA = "camera",
  SCREEN = "screen",
}

export const VIDEO_SOURCE_OPTIONS = [
  {
    label: "摄像头",
    value: VideoSourceType.CAMERA,
  },
  {
    label: "屏幕共享",
    value: VideoSourceType.SCREEN,
  },
];

export const COLOR_LIST: ColorItem[] = [
  {
    active: "#A8C3B1",
    default: "#e8daca",
  },
  {
    active: "#F2B880",
    default: "#f4e8da",
  },
  {
    active: "#6B8E6E",
    default: "#e8daca",
  },
  {
    active: "#5A4E3F",
    default: "#e8daca",
  },
];

export type VoiceTypeMap = {
  [voiceType: string]: string;
};

export type VendorNameMap = {
  [vendorName: string]: VoiceTypeMap;
};

export type LanguageMap = {
  [language: string]: VendorNameMap;
};

export enum EMobileActiveTab {
  AGENT = "agent",
  CHAT = "chat",
}

export const MOBILE_ACTIVE_TAB_MAP = {
  [EMobileActiveTab.AGENT]: "陪护",
  [EMobileActiveTab.CHAT]: "对话",
};

export const isLLM = (extensionName: string) => {
  return extensionName === "llm" || extensionName === "v2v";
};

export const isEditModeOn = process.env.NEXT_PUBLIC_EDIT_GRAPH_MODE === "true";

export const TRULIENCE_SETTINGS_KEY = "__trulience__";
export const DEFAULT_TRULIENCE_OPTIONS: ITrulienceSettings = {
  enabled: false,
  avatarId: "",
  avatarToken: "",
  avatarDesktopLargeWindow: false,
  animationURL: "https://trulience.com",
  trulienceSDK: "https://trulience.com/sdk/trulience.sdk.js",
};
