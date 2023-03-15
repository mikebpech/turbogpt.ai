import React from 'react';
import { ActionIcon, CopyButton, Tooltip } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import styled from 'styled-components/macro';

export function Actions({ copyValue }: { copyValue: string }) {
  return (
    <Wrapper>
      <CopyButton value={copyValue} timeout={2000}>
        {({ copied, copy }) => (
          <Tooltip
            label={copied ? 'Copied' : 'Copy'}
            withArrow
            position="right"
          >
            <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
              {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
