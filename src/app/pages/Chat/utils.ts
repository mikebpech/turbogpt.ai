import { Message } from 'utils/types/injector-typings';
import { ApiModel } from './slice/types';

export function saveOpenAiKey(key: string) {
  if (key !== '') {
    window.localStorage && localStorage.setItem('openAiKey', key);
  }
}

export function getOpenAiKeyFromStorage(): string | null {
  return window.localStorage
    ? (localStorage.getItem('openAiKey') as string) || null
    : null;
}

export function saveCustomUser(value: boolean) {
  window.localStorage &&
    localStorage.setItem('customUserName', value.toString());
}

export function getModelFromStorage(): ApiModel | null {
  return window.localStorage
    ? (localStorage.getItem('model') as ApiModel) || null
    : null;
}

export function saveModelToStorage(model: ApiModel) {
  window.localStorage && localStorage.setItem('model', model);
}

export function getCustomUser(): string | null {
  return window.localStorage
    ? (localStorage.getItem('customUserName') as string) || null
    : null;
}

export function saveCustomAvatar(avatar: string) {
  window.localStorage && localStorage.setItem('avatar', avatar);
}

export function getCustomAvatar(): string | null {
  return window.localStorage
    ? (localStorage.getItem('avatar') as string) || null
    : null;
}

export function saveConversationsToStorage(conversations: Message[][]) {
  window.localStorage &&
    localStorage.setItem('conversations', JSON.stringify(conversations));
}

export function getConversationsFromStorage(): Message[][] | null {
  return window.localStorage
    ? (JSON.parse(
        localStorage.getItem('conversations') as string,
      ) as Message[][]) || null
    : null;
}

export function getMessagesInLocalStorage(): Message[] | null {
  const convos = window.localStorage
    ? (JSON.parse(
        localStorage.getItem('conversations') as string,
      ) as Message[][]) || null
    : null;
  if (convos) {
    return convos[0];
  }

  return null;
}
