// @flow
import { createSelector } from 'reselect';

const selectState = (state: GlobalState) => state;

export const selectNext = createSelector(
  selectState,
  (state: GlobalState) => state.next,
);

export const selectCount = createSelector(
  selectState,
  (state: GlobalState) => state.count,
);
