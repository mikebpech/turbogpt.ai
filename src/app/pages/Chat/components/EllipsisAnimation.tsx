import React from 'react';
import styled from 'styled-components/macro';
import { MessageComponent } from './MessageComponent';
import { Loader } from '@mantine/core';

export function EllipsisAnimation({
  visible = false,
  avatar = '',
}: {
  visible: boolean;
  avatar?: string;
}) {
  return (
    <MessageComponent
      visible={visible}
      loader={true}
      role="assistant"
      avatar={avatar}
      message={<Loader variant="dots" color="white" />}
    />
  );
}
