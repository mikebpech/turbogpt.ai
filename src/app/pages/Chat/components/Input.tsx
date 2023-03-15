import React from 'react';
import { Button, TextInput as MantineInput } from '@mantine/core';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getOpenAiKeyStatus } from '../slice/selectors';
import { useMediaQuery } from 'react-responsive';

export function Input({
  addMessage,
  disabled = false,
}: {
  addMessage: (message: string) => void;
  disabled: boolean;
}) {
  const [message, setMessage] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const apiKeyStatus = useSelector(getOpenAiKeyStatus);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) {
      return;
    }

    if (disabled) {
      return;
    }

    if (loading) {
      return;
    }

    addMessage(message);
    setLoading(true);
    setMessage('');
  };

  React.useEffect(() => {
    if (!disabled) {
      setLoading(false);
    }
  }, [disabled]);

  return (
    <Wrapper>
      <InputWrapper
        isMobile={isTabletOrMobile}
        onSubmit={e => handleSubmitForm(e)}
      >
        <MantineInput
          disabled={!apiKeyStatus}
          radius="md"
          size={isTabletOrMobile ? 'md' : 'lg'}
          onChange={e => setMessage(e.target.value)}
          value={message}
          style={{ width: '100%' }}
          placeholder="Type your message here"
        />
        <Button
          disabled={!apiKeyStatus || disabled}
          loading={loading}
          type="submit"
          size={isTabletOrMobile ? 'md' : 'lg'}
          left={5}
          radius="md"
          variant="light"
          color="indigo"
        >
          Send
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
  position: relative;
  height: fit-content;
  z-index: 100;
`;

const InputWrapper = styled.form<any>`
  width: 100%;
  max-width: ${props => (props.isMobile ? '90%' : '80vw')};
  position: ${props => (props.isMobile ? 'fixed' : 'relative')};
  bottom: 5;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  align-items: center;
  z-index: 50;
`;
