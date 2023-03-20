import { characterOptions } from 'app/api/characters';
import { Link } from 'app/components/Link';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';
import { Message } from 'utils/types/injector-typings';
import {
  getOpenAiKeyStatus,
  getGenerateName,
  getCharacter,
  getVerifyingApiKey,
  getMessages,
} from '../slice/selectors';
import { EllipsisAnimation } from './EllipsisAnimation';
import { MessageComponent } from './MessageComponent';

export function ChatBubbles({
  messages,
  isTyping,
}: {
  messages: Message[];
  isTyping: boolean;
}) {
  const messagesEndRef = useRef(null);
  const apiKeyValid = useSelector(getOpenAiKeyStatus);
  const useCustomName = useSelector(getGenerateName);
  const selectedCharacter = useSelector(getCharacter);
  const verifyingKey = useSelector(getVerifyingApiKey);
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const [customName, setCustomName] = React.useState('');
  const [avatar, setAvatar] = React.useState('');

  const scrollToBottom = () => {
    if (apiKeyValid) {
      // @ts-ignore
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }, [apiKeyValid]);

  useEffect(() => {
    if (useCustomName) {
      fetch('https://random-data-api.com/api/v2/users?size=1&is_xml=true')
        .then(response => response.json())
        .then(data => {
          const fullName = data.first_name + ' ' + data.last_name;
          setCustomName(fullName);
          setAvatar(`https://i.pravatar.cc/150?u=${fullName}`);
        });
    } else {
      if (selectedCharacter !== characterOptions[0]) {
        setCustomName(selectedCharacter);
      } else {
        setCustomName('');
      }

      setAvatar('');
    }
  }, [useCustomName, selectedCharacter]);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [messages]);

  return (
    <Wrapper isMobile={isMobile}>
      {verifyingKey ? (
        <MessageComponent
          customName={customName}
          avatar={avatar}
          useCustomName={useCustomName}
          role="assistant"
          message="Please enter your API Key.."
        />
      ) : !apiKeyValid && !verifyingKey ? (
        <>
          <MessageComponent
            customName={customName}
            avatar={avatar}
            useCustomName={useCustomName}
            role="assistant"
            message={
              <span>
                <StyledLink
                  target="_blank"
                  href="https://platform.openai.com/account/api-keys"
                >
                  Please add a valid OpenAI API key in the menu. Get yours here!
                  You will need to create an account, by the way.
                </StyledLink>
              </span>
            }
          />
          <MessageComponent
            customName={customName}
            avatar={avatar}
            useCustomName={useCustomName}
            role="assistant"
            message="We don't store your API key. It's only used to generate the chat messages and saved locally in your browser :)"
          />
        </>
      ) : (
        messages.map((message, index) => {
          if (message.role === 'system') return null;

          return (
            <MessageComponent
              customName={customName}
              avatar={avatar}
              useCustomName={useCustomName}
              key={index}
              role={message.role}
              message={message.content as string}
              messageIdx={index}
            />
          );
        })
      )}
      <EllipsisAnimation avatar={avatar} visible={isTyping} />
      <div
        style={{ height: '8px', marginTop: 0, paddingBottom: '4px' }}
        ref={messagesEndRef}
      />
    </Wrapper>
  );
}

const StyledLink = styled.a`
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
`;

const Wrapper = styled.div<any>`
  width: 100%;
  z-index: 5;
  min-height: ${props =>
    `calc(${props.isMobile ? '96%' : '92%'} - ${
      StyleConstants.NAV_BAR_HEIGHT
    })`};
  overflow-y: auto;
  height: 100%;
  padding: 10px;
`;
