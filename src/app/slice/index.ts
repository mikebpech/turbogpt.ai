import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ParametersState } from './types';

export const initialState: ParametersState = {
  domain: '',
  customer: '',
  user: '',
};

const slice = createSlice({
  name: 'parameters',
  initialState,
  reducers: {
    setDomain(state, action: PayloadAction<string>) {
      state.domain = action.payload;
    },
    setCustomer(state, action: PayloadAction<string>) {
      state.customer = action.payload;
    },
    setUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
  },
});

export const { actions: parametersActions } = slice;

export const useParametersSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useParametersSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
