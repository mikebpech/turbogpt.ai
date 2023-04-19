import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.chatOptions || initialState;

export const selectChatOptions = createSelector([selectSlice], state => state);
export const getCharacter = createSelector(
  [(state: RootState) => state.chatOptions || initialState],
  options => options.selectedCharacter,
);
export const getMood = createSelector(
  [(state: RootState) => state.chatOptions || initialState],
  options => options.chatMood,
);
export const getOpenAiApiKey = createSelector(
  [(state: RootState) => state.chatOptions || initialState],
  options => options.openAiApiKey,
);
export const getApiPrevKey = createSelector(
  [(state: RootState) => state.chatOptions || initialState],
  options => options.apiPrevKey,
);
export const getOpenAiKeyStatus = createSelector(
  [(state: RootState) => state.chatOptions || initialState],
  options => options.openAiKeyStatus,
);
export const getGenerateName = createSelector(
  [(state: RootState) => state.chatOptions || initialState],
  options => options.generateName,
);
export const getVerifyingApiKey = createSelector(
  [(state: RootState) => state.chatOptions || initialState],
  options => options.verifyingApiKey,
);
export const getMessages = createSelector(
  [(state: RootState) => state.chatOptions || initialState],
  options => options.messages,
);
export const getConversations = createSelector(
  [(state: RootState) => state.chatOptions || initialState],
  options => options.conversations,
);
export const getSelectedConversation = createSelector(
  [(state: RootState) => state.chatOptions || initialState],
  options => options.selectedConversation,
);
export const getSelectedConversationTitle = createSelector(
  [(state: RootState) => state.chatOptions || initialState],
  options => options.conversations[options.selectedConversation].title,
);
export const getModel = createSelector(
  [(state: RootState) => state.chatOptions || initialState],
  options => options.model,
);
export const getCustomPrompt = createSelector(
  [(state: RootState) => state.chatOptions || initialState],
  options => options.customPrompt,
);
export const getUserCreatedPrompts = createSelector(
  [(state: RootState) => state.chatOptions || initialState],
  options => options.userCreatedPrompts,
);
