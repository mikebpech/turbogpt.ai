import React from 'react';
import { Button, TextInput as MantineInput } from '@mantine/core';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getOpenAiKeyStatus } from '../slice/selectors';

export function Input({
  addMessage,
}: {
  addMessage: (message: string) => void;
}) {
  const [message, setMessage] = React.useState<string>('');
  const apiKeyStatus = useSelector(getOpenAiKeyStatus);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMessage(message);
    setMessage('');
  };

  return (
    <Wrapper>
      <InputWrapper onSubmit={e => handleSubmitForm(e)}>
        <MantineInput
          disabled={!apiKeyStatus}
          radius="md"
          size="lg"
          onChange={e => setMessage(e.target.value)}
          value={message}
          style={{ width: '100%' }}
          placeholder="Type your message here"
        />

        <Button
          disabled={!apiKeyStatus}
          type="submit"
          size="lg"
          left={5}
          radius="md"
          variant="light"
          color="indigo"
        >
          Submit
        </Button>
      </InputWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding-top: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const InputWrapper = styled.form`
  width: 100%;
  max-width: 80vw;
  display: flex;
  align-items: center; ;
`;
