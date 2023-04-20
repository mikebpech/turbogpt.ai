import React from 'react';
import { Button, CloseButton, Divider } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { useChatOptionsSlice } from '../slice';
import {
  getConversations,
  getCurrentFork,
  getSelectedConversation,
} from '../slice/selectors';

export function Conversations() {
  const dispatch = useDispatch();
  const conversations = useSelector(getConversations);
  const currentConversation = useSelector(getSelectedConversation);
  const currentFork = useSelector(getCurrentFork);
  const { actions } = useChatOptionsSlice();

  const selectConversation = (index: number) => {
    dispatch(actions.setSelectedConversation(index));
    dispatch(actions.setCurrentFork(-1));
  };

  const deleteFork = (convoIndex: number) => {
    dispatch(actions.removeConvoFork(convoIndex));
    dispatch(actions.setCurrentFork(-1));
  };

  const selectForkConvo = (convoIndex, index: number) => {
    dispatch(actions.setSelectedConversation(convoIndex));
    dispatch(actions.setCurrentFork(index));
  };

  const createNewConvo = () => {
    dispatch(
      actions.addConversation({ title: '', messages: [], subConvos: [] }),
    );
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
        <>
          <ButtonWrap>
            <Button
              key={index}
              color="blue"
              mr="sm"
              size="md"
              maw={220}
              fullWidth
              variant={currentConversation === index ? 'filled' : 'light'}
              onClick={() => selectConversation(index)}
            >
              {conversation.title !== ''
                ? conversation.title
                : conversation.messages.length > 0
                ? conversation.messages[
                    conversation.messages.length - 1
                  ].content.slice(0, 15) + '...'
                : 'New Conversation'}
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
          {conversation.subConvos?.map((subConvo, subIndex) => (
            <ForkWrap>
              <Button
                key={index}
                color="orange"
                mr="sm"
                ml={30}
                size="sm"
                maw={190}
                fullWidth
                variant={
                  currentConversation === index && currentFork === subIndex
                    ? 'filled'
                    : 'light'
                }
                onClick={() => selectForkConvo(index, subIndex)}
              >
                {subConvo.title !== ''
                  ? subConvo.title
                  : subConvo.messages.length > 0
                  ? subConvo.messages[
                      subConvo.messages.length - 1
                    ].content.slice(0, 15) + '...'
                  : 'New Conversation'}
              </Button>
              <CloseButton
                disabled={conversations.length <= 1}
                onClick={() => deleteFork(subIndex)}
                variant="light"
                title="Close popover"
                size="xl"
                iconSize={20}
              />
            </ForkWrap>
          ))}
        </>
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

const ForkWrap = styled.div`
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
