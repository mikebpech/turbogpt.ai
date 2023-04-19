import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.parameters || initialState;

export const selectParameters = createSelector([selectSlice], state => state);
export const getDomain = createSelector(
  [(state: RootState) => state.parameters || initialState],
  parameters => parameters.domain,
);
export const getCustomer = createSelector(
  [(state: RootState) => state.parameters || initialState],
  parameters => parameters.customer,
);
export const getUser = createSelector(
  [(state: RootState) => state.parameters || initialState],
  parameters => parameters.user,
);
