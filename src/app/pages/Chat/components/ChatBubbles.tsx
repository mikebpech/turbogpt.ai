import { Link } from 'app/components/Link';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';
import { Message } from 'utils/types/injector-typings';
import { getOpenAiKeyStatus } from '../slice/selectors';
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

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [messages]);

  return (
    <Wrapper>
      {messages.map((message, index) => {
        if (message.role === 'system') return null;
        if (!apiKeyValid)
          return (
            <>
              <MessageComponent
                role="assistant"
                message={
                  <span>
                    <StyledLink target="_blank" href="#">
                      Please add a valid OpenAI API key to use this feature. Get
                      yours here! You will need to create an account, by the
                      way.
                    </StyledLink>
                  </span>
                }
              />
              <MessageComponent
                role="assistant"
                message="We don't store your API key. It's only used to generate the chat messages and saved locally in your browser :)"
              />
            </>
          );

        return (
          <MessageComponent
            key={index}
            role={message.role}
            message={message.content as string}
          />
        );
      })}
      <div style={{ height: '10px' }} ref={messagesEndRef} />
      <EllipsisAnimation visible={isTyping} />
    </Wrapper>
  );
}

const StyledLink = styled.a`
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
`;

const Wrapper = styled.div`
  width: 100%;
  z-index: 5;
  min-height: calc(97% - ${StyleConstants.NAV_BAR_HEIGHT});
  overflow-y: auto;
  height: max-content;
  padding: 10px;
`;
