const keyRegex = /^sk-[A-Za-z0-9]/;

// Validate OpenAI API key
export const validateOpenAiKey = (key: string) => {
  return keyRegex.test(key);
};
