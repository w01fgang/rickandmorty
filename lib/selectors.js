// @flow
import { createSelector } from 'reselect';

const selectState = (state: GlobalState) => state;

export const selectNext: (state: GlobalState) => (string | null) = createSelector(
  selectState,
  (state: GlobalState) => state.next,
);

export const selectCount: (state: GlobalState) => number = createSelector(
  selectState,
  (state: GlobalState) => state.count,
);
