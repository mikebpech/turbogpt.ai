/**
 *
 * Chat
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

interface Props {}

export function Chat(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return <Div>This is the chat component</Div>;
}

const Div = styled.div``;
