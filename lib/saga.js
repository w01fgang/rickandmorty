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
} from './actions';

import { selectNext } from './selectors';

import { searchForCharacters, fetchMoreCharacters } from './api';

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

function* rootSaga(): Saga<void> {
  yield all([
    takeLatest(actionTypes.MAKE_SEARCH, loadSearchResults),
    takeLatest(actionTypes.LOAD_MORE_CHARACHTERS, loadMoreCharacters),
  ]);
}

export default rootSaga;
