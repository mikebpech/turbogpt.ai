/* --- STATE --- */
export interface ChatOptionsState {
  selectedCharacter: string;
  chatMood: number;
  openAiApiKey: string;
  openAiKeyStatus: boolean;
  generateName: boolean;
  verifyingApiKey: boolean;
}
