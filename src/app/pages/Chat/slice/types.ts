import { Message } from 'utils/types/injector-typings';

/* --- STATE --- */
export interface ChatOptionsState {
  selectedCharacter: string;
  chatMood: number;
  openAiApiKey: string;
  openAiKeyStatus: boolean;
  generateName: boolean;
  verifyingApiKey: boolean;
  apiPrevKey: string;
  messages: Message[];
  conversations: Message[][];
  selectedConversation: number;
  model: ApiModel;
  customPrompt: CustomPrompt;
  userCreatedPrompts: CustomPrompt[];
}

export type CustomPrompt = {
  prompt: string;
  act: string;
};

export type ApiModel = 'gpt-4-1106-preview' | 'gpt-4';
