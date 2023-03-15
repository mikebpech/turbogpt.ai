import React from 'react';
import { Avatar } from '@mantine/core';
import { Prism } from '@mantine/prism';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { getCharacter } from '../slice/selectors';
import {
  characterOptions,
  characterOptionsWithEmojis,
} from 'app/api/characters';

interface MessageComponentProps {
  role?: string;
  message: string | React.ReactNode;
  visible?: boolean;
}

export const MessageComponent = ({
  role = 'user',
  message,
  visible = true,
}: MessageComponentProps) => {
  const avatarProps = {
    src: null,
    alt: 'no image here',
    size: 'md',
    color: 'indigo',
  };

  const characterSelected = useSelector(getCharacter);

  const detectFormatting = (message: string | React.ReactNode) => {
    if (typeof message !== 'string') {
      return message;
    }

    const codeRegex = /```([\s\S]*?)```/g;
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = codeRegex.exec(message)) !== null) {
      // Add the part of the message before the matched code
      if (match.index > lastIndex) {
        const textBeforeCode = message.slice(lastIndex, match.index);
        // Split the text before the code block by newline characters and wrap each line in a <p> element
        const textLines = textBeforeCode
          .split('\n')
          .map((line, index) => <InnerText key={index}>{line}</InnerText>);
        // Add the wrapped lines to the parts array
        parts.push(...textLines);
      }
      // Add the <Code> component with the wrapped lines
      parts.push(
        <CodeWrapper>
          <Prism withLineNumbers language="tsx" key={match.index}>
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
      const remainingLines = remainingText
        .split('\n')
        .map((line, index) => <InnerText key={index}>{line}</InnerText>);
      // Add the wrapped lines to the parts array
      parts.push(...remainingLines);
    }

    // Return the parts as an array of React elements
    return <>{parts}</>;
  };

  const generateAvatarText = (role: string) => {
    if (role === 'user') return 'ME';

    if (characterSelected === characterOptions[0]) return 'AI';

    return characterOptionsWithEmojis[characterSelected] || 'AI';
  };

  return (
    <Message
      style={{
        justifyContent: role === 'assistant' ? 'flex-start' : 'flex-end',
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
        height: visible ? 'auto' : 0,
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
        }}
        radius="0.5rem"
      >
        {generateAvatarText(role)}
      </Avatar>
      <Text>{detectFormatting(message)}</Text>
    </Message>
  );
};

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 15px;
`;

const Text = styled.p`
  margin: 0 10px;
  color: white;
  background-color: ${props => props.theme.chatBubbleSystem};
  padding: 10px;
  font-size: 1rem;
  border-radius: 0.5rem;
`;

const InnerText = styled.p`
  padding: 0;
  margin: 0;
`;

const CodeWrapper = styled.div`
  padding: 10px 0;
  opacity: 100%;

  pre {
    padding-right: 30px;
    background-color: ${props => props.theme.codeBackground} !important;
  }
`;
