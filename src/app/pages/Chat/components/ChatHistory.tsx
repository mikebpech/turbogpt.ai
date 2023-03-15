import { Blockquote } from '@mantine/core';
import React from 'react';
import styled from 'styled-components';

export function ChatHistory() {
  return (
    <Wrapper>
      <Blockquote color="red" cite="– Mike Pechousek">
        <Title>
          Some quote about how previous chats & image generation are coming
          soon.
        </Title>
      </Blockquote>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Title = styled.div`
  padding: 0;
  margin: 0;
  color: ${p => p.theme.text};
  font-size: 0.875rem;
`;
