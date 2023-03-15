import React, { useCallback, useEffect } from 'react';
import { Checkbox, NativeSelect } from '@mantine/core';
import styled from 'styled-components/macro';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacter } from '../slice/selectors';
import { useChatOptionsSlice } from '../slice';
import { characterOptions } from 'app/api/characters';

function SelectCharacter() {
  const [character, setCharacter] = React.useState(useSelector(getCharacter));
  const { actions } = useChatOptionsSlice();
  const dispatch = useDispatch();

  const debouncedDispatch = useCallback(
    debounce(char => {
      dispatch(actions.changeSelectedCharacter(char));
    }, 250),
    [dispatch],
  );

  useEffect(() => {
    debouncedDispatch(character);
  }, [character, debouncedDispatch]);

  return (
    <Wrapper>
      <NativeSelect
        value={character}
        onChange={event => setCharacter(event.currentTarget.value)}
        data={characterOptions}
        label="Select your character"
        description="This will give your AI a personality and cater the conversation to your preferences. Note: This will clear your current conversation."
        variant="default"
      />
      <Checkbox
        color="red"
        className="checkbox"
        label="Spare me a random name?"
      />
    </Wrapper>
  );
}

export default SelectCharacter;

const Wrapper = styled.div`
  margin-bottom: 10px;

  .checkbox {
    margin-top: 10px;
  }
`;
