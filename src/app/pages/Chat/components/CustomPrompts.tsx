import React, { useCallback, useEffect, useState } from 'react';
import { NativeSelect } from '@mantine/core';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomPrompt, getUserCreatedPrompts } from '../slice/selectors';
import { useModalSlice } from 'app/components/Modal/slice';
import fetchPrompts from 'utils/promptservice';

interface Prompt {
  act: string;
  prompt: string;
}
function CustomPrompts() {
  const prompt = useSelector(getCustomPrompt);
  const userPrompts = useSelector(getUserCreatedPrompts);
  const { actions } = useModalSlice();
  const dispatch = useDispatch();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const handleClick = () => {
    dispatch(actions.openPromptModal());
  };

  useEffect(() => {
    const fetchData = async () => {
      const promptsData = await fetchPrompts();
      setPrompts(promptsData);
    };
    fetchData();
  }, []);

  return (
    <Wrapper>
      <span onClick={() => handleClick()}>
        <NativeSelect
          className="native-select"
          value={prompt.act}
          defaultValue="None"
          onChange={event => console.log(event)}
          data={[...prompts.map(p => p.act), ...userPrompts.map(p => p.act)]}
          label="Custom prompts"
          description="This will give your AI a personality and cater the conversation to your preferences."
          variant="filled"
        />
      </span>
    </Wrapper>
  );
}

export default CustomPrompts;

const Wrapper = styled.div`
  margin-bottom: 10px;

  .checkbox {
    margin-top: 10px;
  }

  .native-select {
    pointer-events: none;
  }
`;
