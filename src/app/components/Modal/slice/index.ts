import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ModalState } from './types';

export const initialState: ModalState = {
  editModal: {
    isOpen: false,
    data: '',
    selectedMessageIdx: 0,
  },
};

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openEditModal(state) {
      state.editModal.isOpen = true;
    },
    closeEditModal(state) {
      state.editModal.isOpen = false;
      state.editModal.data = '';
    },
    setEditModalData(state, action: PayloadAction<string>) {
      state.editModal.data = action.payload;
    },
    setEditModalSelectedMessageIdx(state, action: PayloadAction<number>) {
      state.editModal.selectedMessageIdx = action.payload;
    },
  },
});

export const { actions: modalActions } = slice;

export const useModalSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useModalSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
