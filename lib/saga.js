// @flow
import {
  all, call, put, takeLatest, select,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import Result from 'lemons/Result';

import {
  actionTypes, makeSearch,
  loadSearchResultsSuccess,
  loadSearchResultsFail,
  loadMoreSuccess,
  loadMoreFail,
  getCharacterEpisodes,
  loadEpisodesSuccess,
  loadEpisodesFail,
  loadAllCharactersSuccess,
  loadAllCharactersFail,
} from './actions';

import { selectNext } from './selectors';

import {
  searchForCharacters,
  fetchMoreCharacters,
  fetchEpisodesRange,
  fetchAllCaracters,
} from './api';

function* loadSearchResults({ payload }: $Call<typeof makeSearch, string>) {
  const res: Result<Error, ApiResponse<Character>> = yield call(searchForCharacters, payload);
  if (res.isOk()) {
    yield put(loadSearchResultsSuccess(res.unwrap()));
  } else {
    yield put(loadSearchResultsFail());
  }
}

function* loadMoreCharacters() {
  const next = yield select(selectNext);
  const res: Result<Error, ApiResponse<Character>> = yield call(fetchMoreCharacters, { next });
  if (res.isOk()) {
    yield put(loadMoreSuccess(res.unwrap()));
  } else {
    yield put(loadMoreFail());
  }
}

function* loadAllCharacters() {
  const res: Result<Error, ApiResponse<Character>> = yield call(fetchAllCaracters);
  if (res.isOk()) {
    yield put(loadAllCharactersSuccess(res.unwrap()));
  } else {
    yield put(loadAllCharactersFail());
  }
}

const episodeIdRegexp = /api\/episode\/(\d+)/;
function* loadCharacterEposodes({ payload }: $Call<typeof getCharacterEpisodes, Array<string>>) {
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
  ]);
}

export default rootSaga;
