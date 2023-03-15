import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/macro';
import { Message } from 'utils/types/injector-typings';
import { ChatBubbles } from './components/ChatBubbles';
import { Input } from './components/Input';
import { P } from './P';
import { sendMessage } from '../../api/openai';
import { useSelector } from 'react-redux';
import { getCharacter, getMood, getOpenAiApiKey } from './slice/selectors';
import { characterOptions } from 'app/api/characters';

const defaultMessages = [
  { role: 'assistant', content: 'Hello there! Start by typing a message!' },
];

export function Textbox() {
  const [messages, setMessages] = React.useState<Message[]>(defaultMessages);
  const apiKey = useSelector(getOpenAiApiKey);
  const characterSelected = useSelector(getCharacter);
  const moodSelected = useSelector(getMood);

  const { isLoading, isRefetching, refetch } = useQuery(
    'chat',
    async () => {
      const data = await sendMessage(
        apiKey,
        messages,
        moodSelected,
        characterSelected,
      ).then(function (response) {
        return response.json();
      });
      if (data.choices?.length > 0) {
        setMessages([...messages, data.choices[0].message]);
      }
    },
    {
      enabled: false,
    },
  );

  useEffect(() => {
    setMessages(defaultMessages);
  }, [characterSelected]);

  const addMessage = (message: string) => {
    setMessages([...messages, { role: 'user', content: message }]);
    setTimeout(() => {
      refetch();
    }, 1000);
  };

  return (
    <Wrapper>
      <P>
        Model: <b>turbo-gpt-3.5</b>
      </P>
      {characterSelected !== characterOptions[0] && (
        <Character>
          You are now speaking to a virtual {characterSelected}. Cool eh?
        </Character>
      )}
      <ChatBubbles isTyping={isLoading || isRefetching} messages={messages} />
      <Input addMessage={addMessage} />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  margin-top: 5vh;
  height: 80vh;
  display: flex;
  width: 60vw;
  flex-direction: column;
  align-items: center;
  min-height: 320px;
  margin-bottom: 0;
  padding-bottom: 0;
`;

const Character = styled.div`
  color: ${props => props.theme.textSecondary};
`;
