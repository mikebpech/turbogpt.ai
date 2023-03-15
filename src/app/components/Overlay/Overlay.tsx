import { Divider } from '@mantine/core';
import { APIKey } from 'app/pages/Chat/components/APIKey';
import { ChatHistory } from 'app/pages/Chat/components/ChatHistory';
import { LeftSidebar } from 'app/pages/Chat/components/LeftSidebar';
import { MoodSlider } from 'app/pages/Chat/components/MoodSlider';
import SelectCharacter from 'app/pages/Chat/components/SelectCharacter';
import { ThemeSwitch } from 'app/pages/HomePage/Features/ThemeSwitch';
import React from 'react';
import styled from 'styled-components';
import { StyleConstants } from 'styles/StyleConstants';

export function Overlay({ isOpened = false }: { isOpened: boolean }) {
  return (
    <Wrapper isOpened={isOpened}>
      <Inner>
        <Title style={{ marginBottom: '10px' }}>🤯 Options</Title>
        <ThemeSwitch />
        <Divider my="md" variant="dashed" />
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

// This is an overlay wrapper for mobile
const Wrapper = styled.nav<any>`
  position: fixed;
  top: ${StyleConstants.NAV_BAR_HEIGHT};
  left: 0;
  width: 100vw;
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  background-color: ${props => props.theme.backgroundVariant};
`;

const Inner = styled.div`
  max-height: 100%;
  overflow-y: auto;
  border-radius: 0.5rem;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h2`
  padding: 0;
  margin: 0;
  color: ${p => p.theme.text};
  font-weight: bold;
`;
