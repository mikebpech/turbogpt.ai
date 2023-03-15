export function saveOpenAiKey(key: string) {
  window.localStorage && localStorage.setItem('openAiKey', key);
}

/* istanbul ignore next line */
export function getOpenAiKeyFromStorage(): string | null {
  return window.localStorage
    ? (localStorage.getItem('openAiKey') as string) || null
    : null;
}
