// @flow
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import Result from 'lemons/Result';

import {
  actionTypes, makeSearch,
  loadSearchResultsSuccess,
  loadSearchResultsFail,
} from './actions';

import { searchForCharacters } from './api';

function* loadSearchResults({ payload }: $Call<typeof makeSearch, string>) {
  const res: Result<Error, ApiResponse<Character>> = yield call(searchForCharacters, payload);
  if (res.isOk()) {
    yield put(loadSearchResultsSuccess(res.unwrap()));
  } else {
    yield put(loadSearchResultsFail());
  }
}

function* rootSaga(): Saga<void> {
  yield all([
    takeLatest(actionTypes.MAKE_SEARCH, loadSearchResults),
  ]);
}

export default rootSaga;
