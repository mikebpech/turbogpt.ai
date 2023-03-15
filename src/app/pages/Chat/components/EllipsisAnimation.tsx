import React from 'react';
import styled from 'styled-components/macro';
import { MessageComponent } from './MessageComponent';
import { Loader } from '@mantine/core';

export function EllipsisAnimation({ visible = false }: { visible: boolean }) {
  return (
    <MessageComponent
      visible={visible}
      role="assistant"
      message={<Loader variant="dots" color="white" />}
    />
  );
}
