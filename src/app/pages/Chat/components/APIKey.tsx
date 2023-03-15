import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Loader, PasswordInput } from '@mantine/core';
import { validateOpenAiKey } from 'utils/keyValidator';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { getOpenAiApiKey } from '../slice/selectors';
import { IconCheck, IconLock, IconX } from '@tabler/icons-react';
import { useChatOptionsSlice } from '../slice';
import { checkOpenAiKeyValid } from 'app/api/openai';
import { useQuery } from 'react-query';
import { saveOpenAiKey } from '../utils';

export function APIKey() {
  const [apiKey, setApiKey] = React.useState<string>(
    useSelector(getOpenAiApiKey),
  );
  const [error, setError] = React.useState<string | null>(null);
  const dispatch = useDispatch();
  const { actions } = useChatOptionsSlice();

  const { isLoading, isFetching, data, isError, refetch } = useQuery(
    'apiKey',
    () => checkOpenAiKeyValid(apiKey),
    {
      enabled: false,
    },
  );

  const debouncedDispatch = useCallback(
    debounce(async key => {
      refetch(key);
    }, 250),
    [dispatch],
  );

  useEffect(() => {
    if (!data?.ok) {
      setError('Invalid API Key');
    } else {
      dispatch(actions.changeOpenAiApiKey(apiKey));
      dispatch(actions.setOpenAiKeyStatus(true));
    }
  }, [data]);

  useEffect(() => {
    saveOpenAiKey('');
  }, [error]);

  // Validate OpenAI Key
  useEffect(() => {
    if (apiKey.length === 0) {
      setError(null);
    }
    if (apiKey) {
      const valid = validateOpenAiKey(apiKey);
      if (!valid) {
        setError('Invalid API Key');
      } else {
        setError(null);
        debouncedDispatch(apiKey);
      }
    }
  }, [apiKey, debouncedDispatch]);

  const generateIcon = () => {
    if (!apiKey) {
      return <IconLock size={16} />;
    }
    if (isLoading || isFetching) {
      return <Loader color="red" size={16} />;
    }
    if (error) {
      return <IconX size={16} color="red" />;
    }
    if (!error && !isLoading && data?.ok) {
      return <IconCheck size={16} color="green" />;
    }
    return <IconLock size={16} />;
  };

  return (
    <Wrapper>
      <PasswordInput
        withAsterisk
        radius="sm"
        size="xs"
        onChange={e => setApiKey(e.target.value)}
        value={apiKey}
        style={{ width: '100%' }}
        error={isError ? 'Invalid API Key' : error}
        placeholder="OpenAI API Key"
        variant="filled"
        icon={generateIcon()}
        label="OpenAI API Key"
        description="We never save your API key. It is only used to communicate with OpenAI's servers."
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
