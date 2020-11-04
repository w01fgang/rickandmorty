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

export const selectQuery: (state: GlobalState) => string = createSelector(
  selectState,
  (state: GlobalState) => state.query,
);

export const selectEpisodes: (state: GlobalState) => Array<Episode> = createSelector(
  selectState,
  (state: GlobalState) => state.episodes,
);
