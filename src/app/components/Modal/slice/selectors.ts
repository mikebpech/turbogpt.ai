import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.modal || initialState;

export const selectModal = createSelector([selectSlice], state => state);
export const selectEditModalOpen = createSelector(
  [selectSlice],
  state => state.editModal.isOpen,
);
export const selectEditModalData = createSelector(
  [selectSlice],
  state => state.editModal.data,
);
export const selectEditModalSelectedMessageIdx = createSelector(
  [selectSlice],
  state => state.editModal.selectedMessageIdx,
);
export const selectPromptModalOpen = createSelector(
  [selectSlice],
  state => state.promptModal.isOpen,
);
