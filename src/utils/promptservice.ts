import Papa from 'papaparse';

const fetchPrompts = async () => {
  const response = await fetch(
    'https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/prompts.csv',
  );
  const csvData = await response.text();

  const parsedData = Papa.parse(csvData, { header: true }).data as Array<{
    act: string;
    prompt: string;
  }>;

  const prompts = parsedData
    .map(item => ({
      act: item.act,
      prompt: item.prompt,
    }))
    .filter(item => item.act && item.prompt);

  prompts.unshift({
    act: 'None',
    prompt: 'This is the default prompt. This will make the AI act as normal.',
  });

  return prompts;
};

export default fetchPrompts;
