/**
 *
 * Asynchronously loads the component for Chat
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Chat = lazyLoad(
  () => import('./index'),
  module => module.Chat,
);
