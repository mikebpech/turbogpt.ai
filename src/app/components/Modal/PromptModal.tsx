import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import ModalComponent from './index';
import { useModalSlice } from './slice';
import { selectEditModalOpen, selectPromptModalOpen } from './slice/selectors';
import ModalActions from './ModalActions';
import debounce from 'lodash/debounce';
import { useChatOptionsSlice } from 'app/pages/Chat/slice';
import {
  getCustomPrompt,
  getMessages,
  getUserCreatedPrompts,
} from 'app/pages/Chat/slice/selectors';
import { Grid, ScrollArea, SegmentedControl } from '@mantine/core';
import PromptCard from './components/PromptCard';
import prompts from '../../../data/prompts.json';
import CreatePrompt from './components/CreatePrompt';
import { useMediaQuery } from 'react-responsive';

function PromptModal() {
  const { actions } = useModalSlice();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const userPrompts = useSelector(getUserCreatedPrompts);
  const selectedPrompt = useSelector(getCustomPrompt);
  const isOpen = useSelector(selectPromptModalOpen);
  const dispatch = useDispatch();

  const promptsToMap = selectedTab === 0 ? prompts : userPrompts;

  const saveData = debounce((value: string) => {
    dispatch(actions.setEditModalData(value));
  }, 1000);

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
          <SegmentedControl
            mb="md"
            size="md"
            onChange={handleTabChange}
            value={selectedTab.toString()}
            color="red"
            variant="filled"
            data={[
              { label: 'All prompts', value: '0' },
              { label: 'Custom prompts', value: '1' },
            ]}
          />
          <Grid mah={500} className="grid">
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
          </Grid>
        </Wrapper>
      }
    />
  );
}

export default PromptModal;

const Wrapper = styled.div`
  min-height: 500px;
  overflow-y: hidden;
  max-width: 80vw;
  display: flex;
  flex-direction: column;

  .grid {
    overflow-y: scroll;
  }
`;
