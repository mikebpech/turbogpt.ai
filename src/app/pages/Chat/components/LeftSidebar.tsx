import { Divider } from '@mantine/core';
import React from 'react';
import styled from 'styled-components';
import { APIKey } from './APIKey';
import { ChatHistory } from './ChatHistory';
import { MoodSlider } from './MoodSlider';
import SelectCharacter from './SelectCharacter';

export function LeftSidebar() {
  return (
    <Wrapper>
      <Inner>
        <Title style={{ marginBottom: '10px' }}>🤯 Options</Title>
        <APIKey />
        <Divider my="md" variant="dashed" />
        <SelectCharacter />
        <Divider my="md" variant="dashed" />
        <MoodSlider />
        <Divider my="md" variant="dashed" />
        <ChatHistory />
      </Inner>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 30vw;
  margin-right: 10px;
  padding: 5vh 0;
  display: flex;
  justify-content: center;
`;

const Inner = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  width: 320px;
  padding: 20px;
`;

const Title = styled.h2`
  padding: 0;
  margin: 0;
  color: ${p => p.theme.text};
  font-weight: bold;
`;
