import React from 'react';
import { Avatar, Badge } from '@mantine/core';
import { Prism } from '@mantine/prism';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { getCharacter } from '../slice/selectors';
import {
  characterOptions,
  characterOptionsWithEmojis,
} from 'app/api/characters';
import { Actions } from './Actions';
import { useMediaQuery } from 'react-responsive';
import ReactMarkdown from 'react-markdown';

interface MessageComponentProps {
  role?: string;
  message: string | React.ReactNode;
  visible?: boolean;
  customName?: string;
  useCustomName?: boolean;
  avatar?: string;
  loader?: boolean;
  messageIdx?: number;
}

export const MessageComponent = ({
  role = 'user',
  message,
  visible = true,
  customName,
  useCustomName = false,
  avatar,
  loader = false,
  messageIdx,
}: MessageComponentProps) => {
  const avatarProps = {
    src: null,
    alt: 'no image here',
    size: 'md',
    color: 'indigo',
  };

  const characterSelected = useSelector(getCharacter);
  const [showActions, setShowActions] = React.useState(false);

  const detectFormatting = (message: string | React.ReactNode) => {
    if (typeof message !== 'string') {
      return message;
    }

    const codeRegex = /```(?:\w+)?\s*([\s\S]*?)```/g;
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = codeRegex.exec(message)) !== null) {
      // Add the part of the message before the matched code
      if (match.index > lastIndex) {
        const textBeforeCode = message.slice(lastIndex, match.index);
        // Split the text before the code block by newline characters and wrap each line in a <p> element
        const textLines = textBeforeCode.split('\n').map((line, index) => (
          <InnerText key={index}>
            <ReactMarkdown
              components={{
                h1: 'h2',
                h2: 'h3',
              }}
            >
              {line}
            </ReactMarkdown>
          </InnerText>
        ));
        // Add the wrapped lines to the parts array
        parts.push(...textLines);
      }
      // Add the <Code> component with the wrapped lines
      parts.push(
        <CodeWrapper>
          <Prism
            className="prism"
            withLineNumbers
            language="tsx"
            key={match.index}
          >
            {match[1]}
          </Prism>
        </CodeWrapper>,
      );
      lastIndex = codeRegex.lastIndex;
    }

    // Add the remaining part of the message
    if (lastIndex < message.length) {
      const remainingText = message.slice(lastIndex);
      // Split the remaining text by newline characters and wrap each line in a <p> element
      const remainingLines = remainingText.split('\n').map((line, index) => (
        <InnerText key={index}>
          <ReactMarkdown
            components={{
              h1: 'h2',
              h2: 'h3',
            }}
          >
            {line}
          </ReactMarkdown>
        </InnerText>
      ));
      // Add the wrapped lines to the parts array
      parts.push(...remainingLines);
    }

    // Return the parts as an array of React elements
    return parts;
  };

  const generateAvatarText = (role: string) => {
    if (role === 'user') return 'ME';

    if (characterSelected === characterOptions[0]) return 'AI';

    return characterOptionsWithEmojis[characterSelected] || 'AI';
  };

  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  return (
    <Message
      style={{
        justifyContent: role === 'assistant' ? 'flex-start' : 'flex-end',
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
        height: visible ? (loader ? '30px' : 'auto') : 0,
        margin: visible ? '15px 0' : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      <Avatar
        {...avatarProps}
        color={role === 'assistant' ? 'red' : 'indigo'}
        style={{
          order: role === 'assistant' ? 0 : 1,
          width: '44px',
          height: '44px',
          minWidth: '44px',
          marginLeft: '3px',
          marginTop: 0,
        }}
        src={role === 'assistant' ? avatar : null}
        radius="0.5rem"
      >
        {generateAvatarText(role)}
      </Avatar>

      <BubbleWrap>
        {role === 'assistant' && customName && (
          <Badge
            size={isMobile ? 'xs' : 'sm'}
            color="red"
            className="custom-name"
          >
            {customName}
          </Badge>
        )}
        <MessageBar
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          <Text order={role === 'assistant' ? 0 : 1} isMobile={isMobile}>
            {detectFormatting(message)}
          </Text>
          <Actions
            showButtons={showActions}
            messageIdx={messageIdx}
            copyValue={message as string}
          />
        </MessageBar>
      </BubbleWrap>
    </Message>
  );
};

const BubbleWrap = styled.div`
  position: relative;

  .custom-name {
    margin-left: 10px;
    margin-bottom: 5px;
  }
`;

const MessageBar = styled.div`
  display: flex;
  align-items: center;
  overflow-x: hidden;
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const Text = styled.p<any>`
  margin: 0 10px;
  color: #f3f3f3;
  background-color: ${props => props.theme.chatBubbleSystem};
  padding: 10px;
  font-size: 1rem;
  border-radius: 0.5rem;
  width: 96%;
  order: ${props => props.order};

  pre {
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .prism {
    max-width: ${props => (props.isMobile ? '80vw' : 'unset')};
    overflow-x: auto;
  }
`;

const InnerText = styled.p`
  padding: 0;
  margin: 0;

  p {
    margin: 0;
    padding: 0;
  }
`;

const CodeWrapper = styled.div`
  padding: 10px 0;
  overflow-x: auto;
  opacity: 100%;

  pre {
    padding-right: 30px;
    background-color: ${props => props.theme.codeBackground} !important;
  }
`;
