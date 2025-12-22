import { EMessageDataType, EMessageType, type IChatItem } from "@/types";
import { getRandomUserId } from "./utils";

const SENTENCES = [
  "晓佑会在需要时提供温和的陪伴与信息支持。",
  "你可以向她咨询日常问题或寻求简单建议。",
  "她擅长用清晰的语气整理复杂的内容。",
  "当你需要情绪缓冲时，她会保持耐心与尊重。",
  "你也可以让她帮助你做轻量的计划与总结。",
  "她会在保证安全与隐私的前提下给出回应。",
  "请告诉她你今天最需要的帮助。",
];

export const genRandomParagraph = (num: number = 0): string => {
  let paragraph = "";
  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * SENTENCES.length);
    paragraph += SENTENCES[randomIndex] + " ";
  }

  return paragraph.trim();
};

export const genRandomChatList = (num: number = 10): IChatItem[] => {
  const arr: IChatItem[] = [];
  for (let i = 0; i < num; i++) {
    const type = Math.random() > 0.5 ? EMessageType.AGENT : EMessageType.USER;
    arr.push({
      userId: getRandomUserId(),
      userName: type == "agent" ? EMessageType.AGENT : "你",
      text: genRandomParagraph(3),
      type,
      data_type: EMessageDataType.TEXT,
      time: Date.now(),
    });
  }

  return arr;
};
