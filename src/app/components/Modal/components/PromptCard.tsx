import React from 'react';
import { Button, Card, Grid, Group, Text } from '@mantine/core';
import styled from 'styled-components';
import { useModalSlice } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import { useChatOptionsSlice } from 'app/pages/Chat/slice';
import { CustomPrompt } from 'app/pages/Chat/slice/types';

function PromptCard({
  title,
  description,
  active = false,
  isCustom = false,
}: {
  title: string;
  description: string;
  active: boolean;
  isCustom: boolean;
}) {
  const { actions } = useChatOptionsSlice();
  const dispatch = useDispatch();

  const handleSelectPrompt = (prompt: CustomPrompt) => {
    if (active) {
      dispatch(actions.setCustomPrompt({ act: 'None', prompt: '' }));
      return;
    }

    dispatch(actions.setCustomPrompt(prompt));
  };

  const handleDeletePrompt = (prompt: CustomPrompt) => {
    dispatch(actions.removePromptFromUserCreatedPrompts(prompt));
  };

  return (
    <Grid.Col className="grid-item" span={4}>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Group position="apart" mt="md" mb="xs">
          <Text>{title}</Text>
        </Group>

        <TextWrap>{description}</TextWrap>

        <ButtonWrap>
          <Button
            onClick={() =>
              handleSelectPrompt({ act: title, prompt: description })
            }
            variant={active ? 'gradient' : 'light'}
            color="red"
            fullWidth
            mt="md"
            radius="md"
          >
            {active ? 'Active' : 'Activate'}
          </Button>

          {isCustom && (
            <Button
              ml="sm"
              variant="filled"
              color="gray"
              fullWidth
              mt="md"
              onClick={() =>
                handleDeletePrompt({ act: title, prompt: description })
              }
              radius="md"
            >
              Delete
            </Button>
          )}
        </ButtonWrap>
      </Card>
    </Grid.Col>
  );
}

export default PromptCard;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
`;

const TextWrap = styled.div`
  max-height: 200px;
  overflow-y: auto;
  color: ${props => props.theme.textSecondary};
  font-size: 0.8rem;
`;
