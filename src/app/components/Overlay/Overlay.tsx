import React from 'react';
import { Divider, SegmentedControl } from '@mantine/core';
import { APIKey } from 'app/pages/Chat/components/APIKey';
import { PickModel } from 'app/pages/Chat/components/PickModel';
import { MoodSlider } from 'app/pages/Chat/components/MoodSlider';
import SelectCharacter from 'app/pages/Chat/components/SelectCharacter';
import { ThemeSwitch } from 'app/pages/HomePage/Features/ThemeSwitch';
import { ReactComponent as TwitterIcon } from '../NavBar/assets/twitter.svg';
import styled from 'styled-components';
import { StyleConstants } from 'styles/StyleConstants';
import { IconBulb, IconHeartFilled } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { getVerifyingApiKey } from 'app/pages/Chat/slice/selectors';
import { Conversations } from 'app/pages/Chat/components/Conversations';

export function Overlay({ isOpened = false }: { isOpened: boolean }) {
  const [selectedTab, setSelectedTab] = React.useState<number>(0);
  const apiKeyVerifying = useSelector(getVerifyingApiKey);

  const handleTabChange = (value: string) => {
    setSelectedTab(parseInt(value));
  };

  return (
    <Wrapper isOpened={isOpened}>
      <Inner>
        <SegmentedControl
          mb="xs"
          variant="filled"
          color="red"
          disabled={apiKeyVerifying}
          size="md"
          onChange={handleTabChange}
          value={selectedTab.toString()}
          data={[
            { label: 'Options', value: '0' },
            { label: 'Convos', value: '1' },
          ]}
        />
        <Title>🤯 {selectedTab === 0 ? 'Options' : 'Convos'}</Title>
        {selectedTab === 0 && (
          <>
            <ThemeSwitch />
            <Divider my="md" variant="dashed" />
            <APIKey />
            <Divider my="md" variant="dashed" />
            <SelectCharacter />
            <Divider my="md" variant="dashed" />
            <MoodSlider />
            <Divider my="md" variant="dashed" />
            <PickModel />
          </>
        )}
        {selectedTab === 1 && (
          <>
            <Conversations />
          </>
        )}
        <Footer>
          <div className="items">
            <Item
              href="https://ko-fi.com/mikepechousek"
              target="_blank"
              title="Buy me a coffee"
            >
              Buy me a coffee
            </Item>
            <Item
              href="https://twitter.com/turbogpt"
              target="_blank"
              title="Twitter Page"
              rel="noopener noreferrer"
            >
              <TwitterIcon width={18} style={{ marginRight: 5 }} />
              Twitter
            </Item>
            <Item
              href="https://hccar8zm06k.typeform.com/to/An6RHMdE"
              target="_blank"
            >
              <IconBulb width={18} style={{ marginRight: 5 }} />
              Idea
            </Item>
          </div>
          <Love>
            Made with{' '}
            <IconHeartFilled
              size={12}
              style={{ margin: '0 5px', color: 'red' }}
            />{' '}
            in Montreal
          </Love>
        </Footer>
      </Inner>
    </Wrapper>
  );
}

const Love = styled.div`
  font-size: 0.5rem;
  display: flex;
  justify-content: center;
  color: ${props => props.theme.text};
  margin-top: 10px;
`;

const Item = styled.a`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-weight: 500;
  align-items: center;
  font-size: 0.6rem;

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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  .items {
    display: flex;
    align-items: center;
  }
`;

// This is an overlay wrapper for mobile
const Wrapper = styled.nav<any>`
  position: relative;
  position: fixed;
  top: ${props => (props.isOpened ? StyleConstants.NAV_BAR_HEIGHT : '110vh')};
  transition: all 0.3s ease-in-out;
  left: 0;
  overflow-y: auto;
  max-height: 90vh;
  width: 100vw;
  background-color: ${props => props.theme.backgroundVariant};
  padding-bottom: ${StyleConstants.NAV_BAR_HEIGHT};
`;

const Inner = styled.div`
  max-height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
  border-radius: 0.5rem;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h2`
  padding: 0;
  margin: 10px 0;
  color: ${p => p.theme.text};
  font-weight: 500;
`;
