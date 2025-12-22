export namespace ModuleRegistry {
  export enum ModuleType {
    STT = "stt",
    LLM = "llm",
    V2V = "v2v",
    TTS = "tts",
    TOOL = "tool",
  }

  export interface Module {
    name: string;
    type: ModuleType;
    label: string;
  }

  export type NonToolModuleType = Exclude<ModuleType, ModuleType.TOOL>;
  export type NonToolModule = Module & { type: NonToolModuleType };
  export enum Modalities {
    Video = "video",
    Audio = "audio",
    Text = "text",
  }
  export interface LLMModuleOptions {
    inputModalities: Modalities[];
  }
  export interface V2VModuleOptions {
    inputModalities: Modalities[];
  }
  export interface ToolModuleOptions {
    outputContentText?: boolean;
  }
  // Extending Module to define LLMModule with options
  export interface LLMModule extends Module {
    type: ModuleType.LLM; // Ensuring it's specific to LLM
    options: LLMModuleOptions;
  }
  export interface V2VModule extends Module {
    type: ModuleType.V2V;
    options: LLMModuleOptions;
  }
  export interface ToolModule extends Module {
    type: ModuleType.TOOL;
    options: ToolModuleOptions;
  }
}

// Custom labels for specific keys
export const ModuleTypeLabels: Record<
  ModuleRegistry.NonToolModuleType,
  string
> = {
  [ModuleRegistry.ModuleType.STT]: "STT（语音转文字）",
  [ModuleRegistry.ModuleType.LLM]: "LLM（大语言模型）",
  [ModuleRegistry.ModuleType.TTS]: "TTS（文字转语音）",
  [ModuleRegistry.ModuleType.V2V]: "LLM v2v（语音到语音）",
};

export const sttModuleRegistry: Record<string, ModuleRegistry.Module> = {
  deepgram_asr_python: {
    name: "deepgram_asr_python",
    type: ModuleRegistry.ModuleType.STT,
    label: "Deepgram 语音识别",
  },
  transcribe_asr_python: {
    name: "transcribe_asr_python",
    type: ModuleRegistry.ModuleType.STT,
    label: "Transcribe 语音识别",
  },
  speechmatics_asr_python: {
    name: "speechmatics_asr_python",
    type: ModuleRegistry.ModuleType.STT,
    label: "Speechmatics 语音识别",
  },
};

export const llmModuleRegistry: Record<string, ModuleRegistry.LLMModule> = {
  openai_chatgpt_python: {
    name: "openai_chatgpt_python",
    type: ModuleRegistry.ModuleType.LLM,
    label: "OpenAI ChatGPT",
    options: { inputModalities: [ModuleRegistry.Modalities.Text] },
  },
  dify_python: {
    name: "dify_python",
    type: ModuleRegistry.ModuleType.LLM,
    label: "Dify 聊天机器人",
    options: { inputModalities: [ModuleRegistry.Modalities.Text] },
  },
  coze_python_async: {
    name: "coze_python_async",
    type: ModuleRegistry.ModuleType.LLM,
    label: "Coze 聊天机器人",
    options: { inputModalities: [ModuleRegistry.Modalities.Text] },
  },
  gemini_llm_python: {
    name: "gemini_llm_python",
    type: ModuleRegistry.ModuleType.LLM,
    label: "Gemini 大模型",
    options: { inputModalities: [ModuleRegistry.Modalities.Text] },
  },
  bedrock_llm_python: {
    name: "bedrock_llm_python",
    type: ModuleRegistry.ModuleType.LLM,
    label: "Bedrock 大模型",
    options: {
      inputModalities: [
        ModuleRegistry.Modalities.Text,
        ModuleRegistry.Modalities.Video,
      ],
    },
  },
};

export const ttsModuleRegistry: Record<string, ModuleRegistry.Module> = {
  azure_tts: {
    name: "azure_tts",
    type: ModuleRegistry.ModuleType.TTS,
    label: "Azure 语音合成",
  },
  cartesia_tts: {
    name: "cartesia_tts",
    type: ModuleRegistry.ModuleType.TTS,
    label: "Cartesia 语音合成",
  },
  cosy_tts_python: {
    name: "cosy_tts_python",
    type: ModuleRegistry.ModuleType.TTS,
    label: "Cosy 语音合成",
  },
  elevenlabs_tts_python: {
    name: "elevenlabs_tts_python",
    type: ModuleRegistry.ModuleType.TTS,
    label: "Elevenlabs 语音合成",
  },
  fish_audio_tts_python: {
    name: "fish_audio_tts_python",
    type: ModuleRegistry.ModuleType.TTS,
    label: "Fish Audio 语音合成",
  },
  minimax_tts_python: {
    name: "minimax_tts_python",
    type: ModuleRegistry.ModuleType.TTS,
    label: "Minimax 语音合成",
  },
  polly_tts: {
    name: "polly_tts",
    type: ModuleRegistry.ModuleType.TTS,
    label: "Polly 语音合成",
  },
  neuphonic_tts: {
    name: "neuphonic_tts",
    type: ModuleRegistry.ModuleType.TTS,
    label: "Neuphonic 语音合成",
  },
  openai_tts_python: {
    name: "openai_tts_python",
    type: ModuleRegistry.ModuleType.TTS,
    label: "OpenAI 语音合成",
  },
  dubverse_tts: {
    name: "dubverse_tts",
    type: ModuleRegistry.ModuleType.TTS,
    label: "Dubverse 语音合成",
  },
};

export const v2vModuleRegistry: Record<string, ModuleRegistry.V2VModule> = {
  openai_v2v_python: {
    name: "openai_v2v_python",
    type: ModuleRegistry.ModuleType.V2V,
    label: "OpenAI 实时对话",
    options: { inputModalities: [ModuleRegistry.Modalities.Audio] },
  },
  gemini_v2v_python: {
    name: "gemini_v2v_python",
    type: ModuleRegistry.ModuleType.V2V,
    label: "Gemini 实时对话",
    options: {
      inputModalities: [
        ModuleRegistry.Modalities.Video,
        ModuleRegistry.Modalities.Audio,
      ],
    },
  },
  glm_v2v_python: {
    name: "glm_v2v_python",
    type: ModuleRegistry.ModuleType.V2V,
    label: "GLM 实时对话",
    options: { inputModalities: [ModuleRegistry.Modalities.Audio] },
  },
  stepfun_v2v_python: {
    name: "stepfun_v2v_python",
    type: ModuleRegistry.ModuleType.V2V,
    label: "Stepfun 实时对话",
    options: { inputModalities: [ModuleRegistry.Modalities.Audio] },
  },
  azure_v2v_python: {
    name: "azure_v2v_python",
    type: ModuleRegistry.ModuleType.V2V,
    label: "Azure 实时对话",
    options: { inputModalities: [ModuleRegistry.Modalities.Audio] },
  },
};

export const toolModuleRegistry: Record<string, ModuleRegistry.ToolModule> = {
  vision_analyze_tool_python: {
    name: "vision_analyze_tool_python",
    type: ModuleRegistry.ModuleType.TOOL,
    label: "视觉分析工具",
    options: {},
  },
  weatherapi_tool_python: {
    name: "weatherapi_tool_python",
    type: ModuleRegistry.ModuleType.TOOL,
    label: "天气查询工具",
    options: {},
  },
  bingsearch_tool_python: {
    name: "bingsearch_tool_python",
    type: ModuleRegistry.ModuleType.TOOL,
    label: "Bing 搜索工具",
    options: {},
  },
  vision_tool_python: {
    name: "vision_tool_python",
    type: ModuleRegistry.ModuleType.TOOL,
    label: "视觉工具",
    options: {},
  },
  openai_image_generate_tool: {
    name: "openai_image_generate_tool",
    type: ModuleRegistry.ModuleType.TOOL,
    label: "OpenAI 图像生成工具",
    options: { outputContentText: true },
  },
  computer_tool_python: {
    name: "computer_tool_python",
    type: ModuleRegistry.ModuleType.TOOL,
    label: "计算机工具",
    options: { outputContentText: true },
  },
  mcp_client_python: {
    name: "mcp_client_python",
    type: ModuleRegistry.ModuleType.TOOL,
    label: "MCP 客户端工具",
    options: {},
  },
};

export const moduleRegistry: Record<string, ModuleRegistry.Module> = {
  ...sttModuleRegistry,
  ...llmModuleRegistry,
  ...ttsModuleRegistry,
  ...v2vModuleRegistry,
};

export const compatibleTools: Record<string, string[]> = {
  openai_chatgpt_python: [
    "vision_tool_python",
    "weatherapi_tool_python",
    "bingsearch_tool_python",
    "openai_image_generate_tool",
    "computer_tool_python",
    "mcp_client_python",
  ],
  openai_v2v_python: [
    "weatherapi_tool_python",
    "bingsearch_tool_python",
    "openai_image_generate_tool",
    "computer_tool_python",
    "mcp_client_python",
  ],
  gemini_v2v_python: [
    "weatherapi_tool_python",
    "bingsearch_tool_python",
    "openai_image_generate_tool",
    "computer_tool_python",
  ],
  glm_v2v_python: [
    "weatherapi_tool_python",
    "bingsearch_tool_python",
    "openai_image_generate_tool",
    "computer_tool_python",
  ],
  stepfun_v2v_python: [
    "weatherapi_tool_python",
    "bingsearch_tool_python",
    "openai_image_generate_tool",
    "computer_tool_python",
    "mcp_client_python",
  ],
  azure_v2v_python: [
    "weatherapi_tool_python",
    "bingsearch_tool_python",
    "openai_image_generate_tool",
    "computer_tool_python",
    "mcp_client_python",
  ],
};
