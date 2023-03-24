import { Divider, SegmentedControl } from '@mantine/core';
import { IconHeartFilled } from '@tabler/icons-react';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getVerifyingApiKey } from '../slice/selectors';
import { APIKey } from './APIKey';
import { PickModel } from './PickModel';
import { Conversations } from './Conversations';
import { MoodSlider } from './MoodSlider';
import SelectCharacter from './SelectCharacter';
import { StyleConstants } from 'styles/StyleConstants';
import CustomPrompts from './CustomPrompts';

export function LeftSidebar() {
  const [selectedTab, setSelectedTab] = React.useState<number>(0);
  const apiKeyVerifying = useSelector(getVerifyingApiKey);

  const handleTabChange = (value: string) => {
    setSelectedTab(parseInt(value));
  };

  return (
    <Wrapper>
      <Inner>
        <TitleWrapper>
          <Title>🤯 {selectedTab === 0 ? 'Options' : 'Convos'}</Title>
          <SegmentedControl
            disabled={apiKeyVerifying}
            size="xs"
            onChange={handleTabChange}
            value={selectedTab.toString()}
            color="red"
            variant="filled"
            data={[
              { label: 'Options', value: '0' },
              { label: 'Convos', value: '1' },
            ]}
          />
        </TitleWrapper>
        {selectedTab === 0 && (
          <>
            <APIKey />
            <Divider my="md" variant="dashed" />
            <SelectCharacter />
            <Divider my="md" variant="dashed" />
            <CustomPrompts />
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
        <Love>
          Made with{' '}
          <IconHeartFilled
            size={16}
            style={{ margin: '0 5px', color: 'red' }}
          />{' '}
          in Montreal
        </Love>
      </Inner>
    </Wrapper>
  );
}

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  padding: 0;
  margin: 0;
  color: ${p => p.theme.text};
  font-weight: bold;
`;

const Wrapper = styled.div`
  max-height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  overflow-y: auto;
  width: 30vw;
  margin-right: 10px;
  padding: 2vh 0;
  display: flex;
  justify-content: center;
`;

const Inner = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  width: 320px;
  padding: 20px;
`;

const Love = styled.div`
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  color: ${props => props.theme.text};
  font-weight: 500;
  padding-bottom: 15px;
`;
