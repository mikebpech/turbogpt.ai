import { PayloadAction } from '@reduxjs/toolkit';
import { ApiModel, CustomPrompt } from './types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { chatOptionsSaga } from './saga';
import { ChatOptionsState } from './types';
import {
  getCustomUser,
  getOpenAiKeyFromStorage,
  saveCustomUser,
  saveOpenAiKey,
  getConversationsFromStorage,
  saveConversationsToStorage,
  getMessagesInLocalStorage,
  saveModelToStorage,
  getModelFromStorage,
  getCustomUserPrompts,
  saveCustomUserPrompts,
  getSelectedPrompt,
  saveSelectedPrompt,
  getSelectedCharacter,
  saveSelectedCharacter,
} from '../utils';

export const initialState: ChatOptionsState = {
  selectedCharacter: getSelectedCharacter() || 'Default AI',
  chatMood: 50,
  openAiApiKey: getOpenAiKeyFromStorage() || '',
  openAiKeyStatus: false,
  apiPrevKey: '',
  generateName: getCustomUser() === 'true' || false,
  verifyingApiKey: false,
  messages: getMessagesInLocalStorage() || [],
  conversations: getConversationsFromStorage() || [],
  selectedConversation: 0,
  model: getModelFromStorage() || 'gpt-4',
  customPrompt: getSelectedPrompt() || {
    prompt: '',
    act: '',
  },
  userCreatedPrompts: getCustomUserPrompts() || [],
};

const slice = createSlice({
  name: 'chatOptions',
  initialState,
  reducers: {
    changeSelectedCharacter(state, action: PayloadAction<string>) {
      state.selectedCharacter = action.payload;
      saveSelectedCharacter(action.payload);
    },
    changeMood(state, action: PayloadAction<number>) {
      state.chatMood = action.payload;
    },
    changeOpenAiApiKey(state, action: PayloadAction<string>) {
      state.openAiApiKey = action.payload;
      state.verifyingApiKey = false;
      saveOpenAiKey(action.payload);
    },
    setApiKeyPrevKey(state, action: PayloadAction<string>) {
      state.apiPrevKey = action.payload;
    },
    getOpenAiApiKey(state) {
      state.openAiApiKey = getOpenAiKeyFromStorage() || '';
    },
    setOpenAiKeyStatus(state, action: PayloadAction<boolean>) {
      state.openAiKeyStatus = action.payload;
      state.verifyingApiKey = false;
    },
    setGenerateName(state, action: PayloadAction<boolean>) {
      state.generateName = action.payload;
      saveCustomUser(action.payload);
    },
    setVerifyingApiKey(state, action: PayloadAction<boolean>) {
      state.verifyingApiKey = action.payload;
    },
    setMessages(state, action: PayloadAction<any>) {
      state.messages = action.payload;
      const currentConvo = state.selectedConversation;
      state.conversations[currentConvo] = action.payload;
      saveConversationsToStorage(state.conversations);
    },
    updateLastMesssage(state, action: PayloadAction<string>) {
      const lastMessage = state.messages.length - 1;
      state.messages[lastMessage].content += action.payload;
    },
    finalizeLastMessage(state) {
      const currentConvo = state.selectedConversation;
      state.conversations[currentConvo] = state.messages;
      saveConversationsToStorage(state.conversations);
    },
    addConversation(state, action: PayloadAction<any>) {
      state.conversations.push(action.payload);
      state.selectedConversation = state.conversations.length - 1;
      state.messages = [];
      saveConversationsToStorage(state.conversations);
    },
    removeConversation(state, action: PayloadAction<number>) {
      state.conversations.splice(action.payload, 1);
      state.selectedConversation = 0;
      if (state.conversations[0].length) {
        state.messages = state.conversations[0];
      } else {
        state.messages = [];
      }
      saveConversationsToStorage(state.conversations);
    },
    setSelectedConversation(state, action: PayloadAction<number>) {
      state.selectedConversation = action.payload;
      state.messages = state.conversations[action.payload];
    },
    setModel(state, action: PayloadAction<ApiModel>) {
      state.model = action.payload;
      saveModelToStorage(action.payload);
    },
    setCustomPrompt(state, action: PayloadAction<CustomPrompt>) {
      state.customPrompt = action.payload;
      saveSelectedPrompt(action.payload);
    },
    addPromptToUserCreatedPrompts(state, action: PayloadAction<CustomPrompt>) {
      state.userCreatedPrompts.push(action.payload);
      saveCustomUserPrompts(state.userCreatedPrompts);
    },
    removePromptFromUserCreatedPrompts(
      state,
      action: PayloadAction<CustomPrompt>,
    ) {
      const index = state.userCreatedPrompts.findIndex(
        prompt => prompt.act === action.payload.act,
      );
      state.userCreatedPrompts.splice(index, 1);
      saveCustomUserPrompts(state.userCreatedPrompts);
    },
  },
});

export const { actions: chatOptionsActions } = slice;

export const useChatOptionsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: chatOptionsSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useChatOptionsSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
