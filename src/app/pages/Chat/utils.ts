export function saveOpenAiKey(key: string) {
  window.localStorage && localStorage.setItem('openAiKey', key);
}

/* istanbul ignore next line */
export function getOpenAiKeyFromStorage(): string | null {
  return window.localStorage
    ? (localStorage.getItem('openAiKey') as string) || null
    : null;
}

export function saveCustomUser(value: boolean) {
  window.localStorage &&
    localStorage.setItem('customUserName', value.toString());
}

/* istanbul ignore next line */
export function getCustomUser(): string | null {
  return window.localStorage
    ? (localStorage.getItem('customUserName') as string) || null
    : null;
}

export function saveCustomAvatar(avatar: string) {
  window.localStorage && localStorage.setItem('avatar', avatar);
}

/* istanbul ignore next line */
export function getCustomAvatar(): string | null {
  return window.localStorage
    ? (localStorage.getItem('avatar') as string) || null
    : null;
}
