import React, { useCallback, useEffect } from 'react';
import { Slider } from '@mantine/core';
import styled from 'styled-components/macro';
import { getMood } from '../slice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useChatOptionsSlice } from '../slice';
import debounce from 'lodash/debounce';

const Moods = [
  { value: 15, label: 'Sassy' },
  { value: 50, label: 'Neutral' },
  { value: 85, label: 'Pure Class' },
];

export function MoodSlider() {
  const [currentMood, setCurrentMood] = React.useState<number>(
    useSelector(getMood),
  );
  const dispatch = useDispatch();
  const { actions } = useChatOptionsSlice();

  const debouncedDispatch = useCallback(
    debounce(mood => {
      dispatch(actions.changeMood(mood));
    }, 250),
    [dispatch],
  );

  useEffect(() => {
    debouncedDispatch(currentMood);
  }, [currentMood, debouncedDispatch]);

  return (
    <Wrapper>
      <Title>Mood</Title>
      <Description>
        Give me some sass. I'm a little teapot, short and stout.
      </Description>
      <Slider
        value={currentMood}
        onChange={val => setCurrentMood(val)}
        color="blue"
        marks={Moods}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-bottom: 20px;
`;

const Title = styled.div`
  padding: 0;
  margin: 0;
  color: ${p => p.theme.text};
  font-size: 0.875rem;
`;

const Description = styled.div`
  font-size: calc(0.875rem - 0.125rem);
  color: ${props => props.theme.textSecondary};
  line-height: 1.2;
  margin-bottom: 10px;
`;
