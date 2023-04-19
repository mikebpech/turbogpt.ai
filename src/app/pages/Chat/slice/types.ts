import { Conversation, Message } from 'utils/types/injector-typings';

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
  conversations: Conversation[];
  selectedConversation: number;
  model: ApiModel;
  customPrompt: CustomPrompt;
  userCreatedPrompts: CustomPrompt[];
}

export type CustomPrompt = {
  prompt: string;
  act: string;
};

export type ApiModel = 'gpt-3.5-turbo' | 'gpt-4';
