/**
 * Asynchronously loads the component for ChatPage
 */

import * as React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/LoadingIndicator';

export const ChatPage = lazyLoad(
  () => import('./index'),
  module => module.ChatPage,
  {
    fallback: <LoadingIndicator />,
  },
);
