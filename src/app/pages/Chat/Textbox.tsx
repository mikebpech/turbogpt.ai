import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/macro';
import { ChatBubbles } from './components/ChatBubbles';
import { Input } from './components/Input';
import { sendMessage } from '../../api/openai';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCharacter,
  getMessages,
  getModel,
  getMood,
  getOpenAiApiKey,
} from './slice/selectors';
import { characterOptions } from 'app/api/characters';
import { useMediaQuery } from 'react-responsive';
import { useChatOptionsSlice } from './slice';

const defaultMessages = [
  { role: 'assistant', content: 'Hello there! Start by typing a message!' },
];

export function Textbox() {
  const messages = useSelector(getMessages);
  const apiKey = useSelector(getOpenAiApiKey);
  const characterSelected = useSelector(getCharacter);
  const moodSelected = useSelector(getMood);
  const modelSelected = useSelector(getModel);
  const { actions } = useChatOptionsSlice();

  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  const { isLoading, isRefetching, refetch } = useQuery(
    'chat',
    async () => {
      const data = await sendMessage(
        apiKey,
        messages,
        moodSelected,
        characterSelected,
        modelSelected,
      ).then(function (response) {
        return response.json();
      });
      if (data.choices?.length > 0) {
        dispatch(actions.setMessages([...messages, data.choices[0].message]));
      }
    },
    {
      enabled: false,
    },
  );

  const addMessage = (message: string) => {
    dispatch(
      actions.setMessages([...messages, { role: 'user', content: message }]),
    );
    setTimeout(() => {
      refetch();
    }, 1000);
  };

  return (
    <Wrapper isMobile={isTabletOrMobile}>
      {characterSelected !== characterOptions[0] && !isTabletOrMobile && (
        <Character>
          You are now speaking to a virtual {characterSelected}. Cool eh?
        </Character>
      )}
      <ChatBubbles isTyping={isLoading || isRefetching} messages={messages} />
      <Input disabled={isLoading || isRefetching} addMessage={addMessage} />
    </Wrapper>
  );
}

export const Model = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${p => p.theme.textSecondary};
  margin: 0;
  position: absolute;
  top: 15px;
`;

const Wrapper = styled.main<any>`
  height: ${props => (props.isMobile ? '100%' : '100%')};
  display: flex;
  width: ${props => (props.isMobile ? '100%' : '60vw')};
  flex-direction: column;
  align-items: center;
  margin-bottom: 0;
  padding-bottom: 0;
  position: relative;
`;

const Character = styled.div`
  color: ${props => props.theme.textSecondary};
  padding: 10px 0;
`;
