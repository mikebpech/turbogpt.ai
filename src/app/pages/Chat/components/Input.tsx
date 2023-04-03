import React from 'react';
import { ActionIcon, Button, Textarea as MantineInput } from '@mantine/core';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getOpenAiKeyStatus, getVerifyingApiKey } from '../slice/selectors';
import { useMediaQuery } from 'react-responsive';
import { IconRefresh } from '@tabler/icons-react';

export function Input({
  addMessage,
  disabled = false,
  handleRegen,
  canRegen = false,
  text,
}: {
  addMessage: (message: string) => void;
  handleRegen: () => void;
  disabled: boolean;
  canRegen: boolean;
  text: string;
}) {
  const [message, setMessage] = React.useState<string>('');
  const apiKeyStatus = useSelector(getOpenAiKeyStatus);
  const apiKeyVerifiying = useSelector(getVerifyingApiKey);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (disabled) {
      return;
    }

    addMessage(message);
    setMessage('');
  };

  // Listen for enter key on textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // If holding shift + enter
    if (!e.shiftKey && e.key === 'Enter') {
      handleSubmitForm(e as any);
    }
  };

  return (
    <Wrapper>
      <InputWrapper
        isMobile={isTabletOrMobile}
        onSubmit={e => handleSubmitForm(e)}
      >
        <MantineInput
          disabled={!apiKeyStatus || apiKeyVerifiying}
          radius="md"
          size={isTabletOrMobile ? 'md' : 'lg'}
          onChange={e => setMessage(e.target.value)}
          value={message}
          style={{ width: '100%' }}
          placeholder="Type your message here"
          onKeyDown={e => handleKeyDown(e)}
          minRows={1}
          maxRows={3}
          autosize={true}
        />
        <Button
          disabled={!apiKeyStatus || disabled || apiKeyVerifiying}
          type="submit"
          size={isTabletOrMobile ? 'md' : 'lg'}
          left={5}
          radius="md"
          variant="light"
          color="indigo"
        >
          {text}
        </Button>
        <Button
          onClick={() => handleRegen()}
          disabled={!apiKeyStatus || disabled || apiKeyVerifiying || !canRegen}
          type="button"
          size={isTabletOrMobile ? 'md' : 'lg'}
          variant="filled"
          radius="md"
          ml={10}
          color="red"
          style={{ padding: '0 10px' }}
        >
          <IconRefresh />
        </Button>
      </InputWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 100;
`;

const InputWrapper = styled.form<any>`
  width: 100%;
  max-width: ${props => (props.isMobile ? '90%' : '80vw')};
  position: ${props => (props.isMobile ? 'fixed' : 'relative')};
  bottom: ${props => (props.isMobile ? '30px' : '20px')};
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  align-items: center;
  z-index: 50;
`;
