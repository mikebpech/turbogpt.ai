import React from 'react';
import { useMediaQuery } from 'react-responsive';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import ModalComponent from './index';
import { useModalSlice } from './slice';
import { selectPromptModalOpen } from './slice/selectors';
import {
  getCustomPrompt,
  getUserCreatedPrompts,
} from 'app/pages/Chat/slice/selectors';
import { Grid, SegmentedControl, Input, useMantineTheme } from '@mantine/core';
import PromptCard from './components/PromptCard';
import prompts from '../../../data/prompts.json';
import CreatePrompt from './components/CreatePrompt';

const CustomGrid = styled(Grid).withConfig<{ matineTheme: any }>({
  shouldForwardProp: prop => prop !== 'matineTheme',
})<{ matineTheme: any }>`
  ${({ matineTheme }) => `
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: ${matineTheme.colors.background};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${matineTheme.colors.red[6]};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${matineTheme.colors.background};
    border-radius: 8px;
  }
`}
`;

function PromptModal() {
  const matineTheme = useMantineTheme();
  const { actions } = useModalSlice();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const userPrompts = useSelector(getUserCreatedPrompts);
  const selectedPrompt = useSelector(getCustomPrompt);
  const isOpen = useSelector(selectPromptModalOpen);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState('');
  const promptsToMap = (selectedTab === 0 ? prompts : userPrompts).filter(
    prompt => prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

  const onClose = () => {
    dispatch(actions.closePromptModal());
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(parseInt(value));
  };

  return (
    <ModalComponent
      isOpen={isOpen}
      modalProps={{ size: 'xl' }}
      open={() => dispatch(actions.openEditModal())}
      close={() => onClose()}
      title="Prompts"
      children={
        <Wrapper>
          <Input
            mb="md"
            size="md"
            placeholder="Search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <SegmentedControl
            mb="md"
            size={isMobile ? 'sm' : 'md'}
            onChange={handleTabChange}
            value={selectedTab.toString()}
            color="red"
            variant="filled"
            data={[
              { label: isMobile ? 'Default' : 'All prompts', value: '0' },
              {
                label: isMobile ? 'My prompts' : 'Custom prompts',
                value: '1',
              },
            ]}
          />

          <CustomGrid matineTheme={matineTheme} mah={500} className="grid">
            {selectedTab === 1 && (
              <CreatePrompt
                title="Create a new prompt"
                description={selectedPrompt.prompt}
              />
            )}
            {promptsToMap.map((prompt, index) => (
              <PromptCard
                key={index}
                title={prompt.act}
                description={prompt.prompt}
                active={selectedPrompt.act === prompt.act}
                isCustom={selectedTab === 1}
              />
            ))}
          </CustomGrid>
        </Wrapper>
      }
    />
  );
}

export default PromptModal;

const Wrapper = styled.div`
  min-height: 500px;
  overflow-y: hidden;
  overflow-x: hidden;
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  padding-right: 8px; // to avoid horizontal scroll
  .grid {
    overflow-y: scroll;
  }
`;
