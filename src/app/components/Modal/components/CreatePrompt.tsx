import React from 'react';
import { Button, Card, Grid, Input, Textarea } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useChatOptionsSlice } from 'app/pages/Chat/slice';
import { CustomPrompt } from 'app/pages/Chat/slice/types';
import { useMediaQuery } from 'react-responsive';

function CreatePrompt({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { actions } = useChatOptionsSlice();
  const dispatch = useDispatch();
  const [act, setAct] = React.useState('');
  const [prompt, setPrompt] = React.useState('');
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  const handleSelectPrompt = (prompt: CustomPrompt) => {
    dispatch(actions.setCustomPrompt(prompt));
  };

  const handleCreatePrompt = () => {
    if (!act || !prompt) {
      return;
    }
    dispatch(actions.addPromptToUserCreatedPrompts({ act, prompt }));
    handleSelectPrompt({ act, prompt });
    setAct('');
    setPrompt('');
  };

  return (
    <Grid.Col span={isMobile ? 'auto' : 4}>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Input
          onChange={e => setAct(e.target.value)}
          mb="md"
          radius="md"
          size="sm"
          placeholder="Custom Prompt Name"
        />

        <Textarea
          onChange={e => setPrompt(e.target.value)}
          radius="md"
          size="sm"
          minRows={3}
          maxRows={5}
          autosize={true}
          placeholder="Prompt Text"
        />

        <Button
          mr="sm"
          onClick={() => handleCreatePrompt()}
          variant="filled"
          color="red"
          fullWidth
          mt="md"
          radius="md"
        >
          Create
        </Button>
      </Card>
    </Grid.Col>
  );
}

export default CreatePrompt;
