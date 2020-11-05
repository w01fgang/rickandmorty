// @flow
import {
  all, call, put, takeLatest, select,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import Result from 'lemons/Result';

import {
  actionTypes,
  makeSearch,
  loadSearchResultsSuccess,
  loadSearchResultsFail,
  loadMoreSuccess,
  loadMoreFail,
  getCharacterEpisodes,
  loadEpisodesSuccess,
  loadEpisodesFail,
  loadAllCharactersSuccess,
  loadAllCharactersFail,
  getMoreCharacters,
  setPage,
} from './actions';
import { selectNext, selectCharacters } from './selectors';
import {
  searchForCharacters,
  fetchMoreCharacters,
  fetchEpisodesRange,
  fetchAllCaracters,
} from './api';
import { cardsPerPage } from './constants';

export function* loadSearchResults({ payload }: $Call<typeof makeSearch, string>): Saga<void> {
  const res: Result<Error, ApiResponse<Character>> = yield call(searchForCharacters, payload);
  if (res.isOk()) {
    yield put(loadSearchResultsSuccess(res.unwrap()));
  } else {
    yield put(loadSearchResultsFail());
  }
}

export function* loadMoreCharacters(): Saga<void> {
  const next = yield select(selectNext);
  const res: Result<Error, ApiResponse<Character>> = yield call(fetchMoreCharacters, { next });
  if (res.isOk()) {
    yield put(loadMoreSuccess(res.unwrap()));
  } else {
    yield put(loadMoreFail());
  }
}

export function* loadAllCharacters(): Saga<void> {
  const res: Result<Error, ApiResponse<Character>> = yield call(fetchAllCaracters);
  if (res.isOk()) {
    yield put(loadAllCharactersSuccess(res.unwrap()));
  } else {
    yield put(loadAllCharactersFail());
  }
}

export function* loadMissingCharacters({ payload }: $Call<typeof setPage, number>): Saga<void> {
  const page: number = payload;
  const characters = yield select(selectCharacters);
  if (
    characters.length > 0
    && characters.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage).length === 0
  ) {
    yield put(getMoreCharacters());
  }
}

const episodeIdRegexp = /api\/episode\/(\d+)/;
/* eslint-disable-next-line max-len */
export function* loadCharacterEposodes({ payload }: $Call<typeof getCharacterEpisodes, Array<string>>): Saga<void> {
  const range: string = payload.map((str) => {
    const [, id] = episodeIdRegexp.exec(str) || [];
    return id;
  }).join();
  const res: Result<Error, Array<Episode>> = yield call(fetchEpisodesRange, range);
  if (res.isOk()) {
    yield put(loadEpisodesSuccess(res.unwrap()));
  } else {
    yield put(loadEpisodesFail());
  }
}

function* rootSaga(): Saga<void> {
  yield all([
    takeLatest(actionTypes.MAKE_SEARCH, loadSearchResults),
    takeLatest(actionTypes.LOAD_MORE_CHARACHTERS, loadMoreCharacters),
    takeLatest(actionTypes.LOAD_CHARACHTER_EPISODES, loadCharacterEposodes),
    takeLatest(actionTypes.GET_ALL_CHARACTERS, loadAllCharacters),
    takeLatest(actionTypes.SET_PAGE, loadMissingCharacters),
  ]);
}

export default rootSaga;
