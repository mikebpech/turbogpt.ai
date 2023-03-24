import { ApiModel, CustomPrompt } from 'app/pages/Chat/slice/types';
import { Message } from 'utils/types/injector-typings';
import { characterPrompts } from './characters';

// Make an API Call to check if the key is valid on OpenAI
export const checkOpenAiKeyValid = (key: string, model: string) =>
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      referrer: 'https://turbogpt.ai/',
    },
    body: JSON.stringify({
      model: model || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'hello' }],
    }),
  });

const fetchMessage = (key: string, messages: Message[], model: ApiModel) => {
  return fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      referrer: 'https://turbogpt.ai/',
    },
    body: JSON.stringify({
      model: model || 'gpt-3.5-turbo',
      messages: messages,
    }),
  });
};

export const sendMessage = (
  key: string,
  messages: Message[],
  mood: number,
  characterSelected: string,
  model: ApiModel,
  customPrompt: CustomPrompt,
) => {
  let copy = [...messages];

  if (model === 'gpt-4') {
    if (copy.length > 12) {
      copy = copy.slice(copy.length - 12, copy.length);
    }
  }

  if (model === 'gpt-3.5-turbo') {
    if (copy.length > 8) {
      copy = copy.slice(copy.length - 8, copy.length);
    }
  }

  if (characterPrompts[characterSelected]) {
    console.log('--- Selected Character... Adding to messages... ---');
    copy = [
      { role: 'system', content: characterPrompts[characterSelected] },
      ...copy,
    ];
  }

  if (mood !== 50) {
    let prompt = '';
    if (mood < 10) {
      prompt =
        'I want you to be extremely sassy. Use a lot of emojis. Every single thing you answer should be answered as such.';
    } else if (mood < 20) {
      prompt =
        'I want you to be sassy. Use emojis. Every single thing you answer should be answered as such.';
    } else if (mood < 30) {
      prompt =
        'I want you to be a little sassy. Use emojis. Every single thing you answer should be answered as such.';
    } else if (mood < 40) {
      prompt =
        'I want you to act normal. Every single thing you answer should be answered as such.';
    } else if (mood < 50) {
      prompt = 'I want you to be a little professional. ';
    } else if (mood < 60) {
      prompt = 'I want you to be professional.';
    } else if (mood < 70) {
      prompt = 'I want you to be extremely professional.';
    } else if (mood < 80) {
      prompt = 'I want you to be classy';
    } else if (mood < 90) {
      prompt =
        'I want you to be extremely classy. Every single thing you answer should be answered as such.';
    } else if (mood <= 100) {
      prompt =
        'I want you to be the classiest bot alive. Every single thing you answer should be answered as such.';
    }
    console.log('--- Selected Mood... Adding to messages... ---');
    copy = [
      {
        role: 'system',
        content: prompt,
      },
      ...copy,
    ];
  }

  if (customPrompt && customPrompt.act !== 'None') {
    console.log('--- Selected Custom Prompt... Adding to messages... ---');
    copy = [
      {
        role: 'system',
        content: customPrompt.prompt,
      },
      ...copy,
    ];
  }

  // Add markdown support
  copy = [
    {
      role: 'system',
      content:
        "Use markdown to format all your answers. (Don't mention it to the other user).",
    },
    ...copy,
  ];

  return fetchMessage(key, copy, model);
};

export const generateImage = (
  key: string,
  prompt: string,
  n: number = 1,
  size: string = '1024x1024',
  response_format: string = 'url',
) => {
  return fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      referrer: 'https://turbogpt.ai/',
    },
    body: JSON.stringify({
      prompt: prompt,
      n: n,
      size: size,
      response_format: response_format,
    }),
  });
};
