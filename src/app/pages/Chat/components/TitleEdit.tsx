import { ActionIcon, CloseButton, Group, Input } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useChatOptionsSlice } from '../slice';
import { getSelectedConversationTitle } from '../slice/selectors';

function TitleEdit({ onClick }: { onClick: () => void }) {
  const [value, setValue] = React.useState(
    useSelector(getSelectedConversationTitle),
  );
  const dispatch = useDispatch();
  const { actions } = useChatOptionsSlice();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    handleSetTitle();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSetTitle = () => {
    dispatch(actions.setConvoTitle(value));
    onClick();
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Input value={value} onChange={handleChange} />
      <Group spacing="xs" ml={5}>
        <ActionIcon
          onClick={() => handleSetTitle()}
          ml={8}
          size="lg"
          color="green"
          variant="filled"
        >
          <IconCheck size="1.5rem" />
        </ActionIcon>
        <CloseButton
          onClick={() => onClick()}
          title="Close popover"
          color="blue"
          variant="filled"
          size="lg"
          iconSize={20}
        />
      </Group>
    </Wrapper>
  );
}

export default TitleEdit;

const Wrapper = styled.form`
  display: flex;
  align-items: center;
`;
