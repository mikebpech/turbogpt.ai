import { Button, Card, Grid, Group, Text } from '@mantine/core';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useChatOptionsSlice } from 'app/pages/Chat/slice';
import { CustomPrompt } from 'app/pages/Chat/slice/types';
import { useMediaQuery } from 'react-responsive';
import { useMantineTheme } from '@mantine/core';

const TextWrap = styled.div.withConfig<{ matineTheme: any }>({
  shouldForwardProp: prop => prop !== 'matineTheme',
})<{ matineTheme: any }>`
  max-height: 200px;
  overflow-y: auto;
  color: ${props => props.theme.textSecondary};
  font-size: 0.8rem;
  ${({ matineTheme }) => `
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: ${matineTheme.colors.background};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${matineTheme.colors.red[6]};
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${matineTheme.colors.background};
    border-radius: 5px;
  }
`}
`;

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
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

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
  const matineTheme = useMantineTheme();

  return (
    <Grid.Col style={{ margin: 'auto auto' }} span={isMobile ? 10 : 4}>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Group position="apart" mt="md" mb="xs">
          <Text>{title}</Text>
        </Group>

        <TextWrap matineTheme={matineTheme}>{description}</TextWrap>

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
              {isMobile ? 'Del' : 'Delete'}
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
