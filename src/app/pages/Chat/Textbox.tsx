import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/macro';
import { ChatBubbles } from './components/ChatBubbles';
import { Input } from './components/Input';
import { sendMessage } from '../../api/openai';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCharacter,
  getCustomPrompt,
  getMessages,
  getModel,
  getMood,
  getOpenAiApiKey,
  getSelectedConversationTitle,
} from './slice/selectors';
import { characterOptions } from 'app/api/characters';
import { useMediaQuery } from 'react-responsive';
import { useChatOptionsSlice } from './slice';
import TitleEdit from './components/TitleEdit';

/** The user has requested to stop the streaming response. */
let stopRequest = false;

export function Textbox() {
  const messages = useSelector(getMessages);
  const apiKey = useSelector(getOpenAiApiKey);
  const characterSelected = useSelector(getCharacter);
  const moodSelected = useSelector(getMood);
  const modelSelected = useSelector(getModel);
  const customPrompt = useSelector(getCustomPrompt);
  const conversationTitle = useSelector(getSelectedConversationTitle);
  const [isEditing, setIsEditing] = React.useState(false);
  /** The request has been sent but no data returned yet. */
  const [initialLoading, setInitialLoading] = React.useState(false);
  const { actions } = useChatOptionsSlice();

  const getText = () => {
    return isLoading || isRefetching ? 'Stop' : 'Submit';
  };

  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  const { isLoading, isRefetching, refetch } = useQuery(
    'chat',
    async () => {
      setInitialLoading(true);
      const dataLines = sendMessage(
        apiKey,
        messages,
        moodSelected,
        characterSelected,
        modelSelected,
        customPrompt,
      );
      const next = await dataLines.next();
      setInitialLoading(false);
      updateLastMessage(next.value);
      dispatch(
        actions.setMessages([...messages, { role: 'assistant', content: '' }]),
      );
      for await (const data of dataLines) {
        if (data === 'DONE') {
          dispatch(actions.finalizeLastMessage());
          break;
        }

        if (stopRequest) {
          dataLines.return();
          stopRequest = false;
        }
        updateLastMessage(data);
      }
    },
    {
      enabled: false,
    },
  );

  const updateLastMessage = (data: any) => {
    if (data.choices?.length > 0 && data.choices[0].delta.content) {
      dispatch(actions.updateLastMesssage(data.choices[0].delta.content));
    }
  };

  const handleRegenLastMessage = () => {
    const newMessages = messages.slice(0, messages.length - 1);
    dispatch(actions.setMessages(newMessages));
    setTimeout(() => {
      refetch();
    }, 0);
  };

  const addMessage = (message: string) => {
    console.log('isLoading', isLoading, 'isRefetching', isRefetching);
    if (isLoading || isRefetching) {
      stopRequest = true;
      return;
    }

    if (message === '') {
      return;
    }
    dispatch(
      actions.setMessages([...messages, { role: 'user', content: message }]),
    );
    setTimeout(() => {
      refetch();
    }, 0);
  };

  return (
    <Wrapper isMobile={isTabletOrMobile}>
      <TitleEditWrapper>
        {isEditing ? (
          <TitleEdit onClick={() => setIsEditing(!isEditing)} />
        ) : (
          <ChatTitle onClick={() => setIsEditing(!isEditing)}>
            {conversationTitle || 'Unnamed Conversation'}
          </ChatTitle>
        )}
      </TitleEditWrapper>
      <ChatBubbles isTyping={initialLoading} messages={messages} />
      <Input
        text={getText()}
        canRegen={
          messages.length > 1 &&
          messages[messages.length - 1].role === 'assistant' &&
          !isLoading &&
          !isRefetching
        }
        handleRegen={handleRegenLastMessage}
        disabled={initialLoading}
        addMessage={addMessage}
      />
    </Wrapper>
  );
}

const TitleEditWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const ChatTitle = styled.h3`
  color: ${p => p.theme.text};
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  margin: 0;
  padding: 0;
  padding-bottom: 5px;
  cursor: text;
`;

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
  width: ${props => (props.isMobile ? '100%' : '65vw')};
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
