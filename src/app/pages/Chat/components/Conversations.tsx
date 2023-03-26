import React from 'react';
import { Button, CloseButton, Divider } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { useChatOptionsSlice } from '../slice';
import { getConversations, getSelectedConversation } from '../slice/selectors';

export function Conversations() {
  const dispatch = useDispatch();
  const conversations = useSelector(getConversations);
  const currentConversation = useSelector(getSelectedConversation);
  const { actions } = useChatOptionsSlice();

  const selectConversation = (index: number) => {
    dispatch(actions.setSelectedConversation(index));
  };

  const createNewConvo = () => {
    dispatch(actions.addConversation([]));
  };

  return (
    <Wrapper>
      <Button
        onClick={createNewConvo}
        color="blue"
        size="lg"
        fullWidth
        variant="light"
        disabled={conversations.length >= 8}
      >
        New Conversation
      </Button>
      <Divider variant="dashed" my="md" />
      {conversations.map((conversation, index) => (
        <ButtonWrap>
          <Button
            key={index}
            color="red"
            mr="sm"
            size="md"
            fullWidth
            variant={currentConversation === index ? 'filled' : 'light'}
            onClick={() => selectConversation(index)}
          >
            {!!conversation[conversation.length - 1]?.content
              ? conversation[conversation.length - 1].content.slice(0, 15) +
                '...'
              : 'Empty Conversation'}
          </Button>
          <CloseButton
            disabled={conversations.length <= 1}
            onClick={() => dispatch(actions.removeConversation(index))}
            variant="light"
            title="Close popover"
            size="xl"
            iconSize={20}
          />
        </ButtonWrap>
      ))}
      <Divider variant="dashed" my="md" />
    </Wrapper>
  );
}

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Wrapper = styled.div`
  margin-top: 20px;
  min-height: 60vh;
`;
