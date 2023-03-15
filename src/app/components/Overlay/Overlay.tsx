import React from 'react';
import { Divider } from '@mantine/core';
import { APIKey } from 'app/pages/Chat/components/APIKey';
import { ChatHistory } from 'app/pages/Chat/components/ChatHistory';
import { MoodSlider } from 'app/pages/Chat/components/MoodSlider';
import SelectCharacter from 'app/pages/Chat/components/SelectCharacter';
import { ThemeSwitch } from 'app/pages/HomePage/Features/ThemeSwitch';
import { ReactComponent as TwitterIcon } from '../NavBar/assets/twitter.svg';
import styled from 'styled-components';
import { StyleConstants } from 'styles/StyleConstants';
import { IconHeartFilled } from '@tabler/icons-react';

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
        <Footer>
          <Item
            href="https://ko-fi.com/mikepechousek"
            target="_blank"
            title="Buy me a coffee"
          >
            Buy me a coffee{' '}
            <IconHeartFilled
              style={{ marginLeft: 5, color: 'red' }}
              size={16}
            />
          </Item>
          <Item
            href="https://twitter.com/mikepechousek"
            target="_blank"
            title="Twitter Page"
            rel="noopener noreferrer"
          >
            <TwitterIcon width={18} style={{ marginRight: 5 }} />
            Twitter
          </Item>
        </Footer>
      </Inner>
    </Wrapper>
  );
}

const Item = styled.a`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;

const Footer = styled.footer`
  display: flex;
  position: absolute;
  bottom: 20px;
  justify-content: center;
  right: 10px;
  width: 100%;
`;

// This is an overlay wrapper for mobile
const Wrapper = styled.nav<any>`
  position: relative;
  position: fixed;
  top: ${props => (props.isOpened ? StyleConstants.NAV_BAR_HEIGHT : '105vh')};
  transition: all 0.3s ease-in-out;
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
