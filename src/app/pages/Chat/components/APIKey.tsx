import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Loader, PasswordInput } from '@mantine/core';
import { validateOpenAiKey } from 'utils/keyValidator';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOpenAiApiKey,
  getOpenAiKeyStatus,
  getApiPrevKey,
} from '../slice/selectors';
import { IconCheck, IconLock, IconX } from '@tabler/icons-react';
import { useChatOptionsSlice } from '../slice';
import { checkOpenAiKeyValid } from 'app/api/openai';
import { useQuery } from 'react-query';
import { getOpenAiKeyFromStorage, saveOpenAiKey } from '../utils';

export function APIKey() {
  const [apiKey, setApiKey] = React.useState<string>(
    useSelector(getOpenAiApiKey),
  );
  const [error, setError] = React.useState<string | null>(null);
  const dispatch = useDispatch();
  const { actions } = useChatOptionsSlice();
  const apiKeyStatus = useSelector(getOpenAiKeyStatus);
  const apiKeyPrev = useSelector(getApiPrevKey);

  const { isLoading, isFetching, data, isError, refetch } = useQuery(
    'apiKey',
    () => checkOpenAiKeyValid(apiKey),
    {
      enabled: false,
      refetchOnMount: false,
    },
  );

  const debouncedDispatch = useCallback(
    debounce(async key => {
      if (apiKeyStatus && apiKey && apiKey === apiKeyPrev) {
        return;
      }
      dispatch(actions.setVerifyingApiKey(true));
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
      dispatch(actions.setApiKeyPrevKey(apiKey));
    }
  }, [data]);

  useEffect(() => {
    saveOpenAiKey('');
  }, [error]);

  // Validate OpenAI Key
  useEffect(() => {
    if (apiKey.length === 0) {
      setError(null);
      dispatch(actions.setOpenAiKeyStatus(false));
    }
    if (apiKey) {
      const valid = validateOpenAiKey(apiKey);
      if (!valid) {
        setError('Invalid API Key');
        dispatch(actions.setOpenAiKeyStatus(false));
      } else {
        setError(null);
        debouncedDispatch(apiKey);
      }
    }
  }, [apiKey, debouncedDispatch, dispatch]);

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
        description={
          <>
            We never save your API key. It is only used to communicate with
            OpenAI's servers.{' '}
            <Link
              target="_blank"
              href="https://platform.openai.com/account/api-keys"
            >
              get it here!
            </Link>
          </>
        }
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Link = styled.a`
  color: ${props => props.theme.text};
  text-decoration: underline;

  &:visited {
    color: ${props => props.theme.text};
  }
`;
