import {
  call, put, select,
} from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import {
  searchForCharacters,
  fetchMoreCharacters,
} from './api';

import { selectNext } from './selectors';

import {
  loadSearchResultsSuccess,
  loadSearchResultsFail,
  loadMoreSuccess,
  loadMoreFail,
} from './actions';

import {
  loadSearchResults,
  loadMoreCharacters,
} from './saga';

describe('Saga', () => {
  describe('loadSearchResults', () => {
    describe('success', () => {
      const it = sagaHelper(loadSearchResults({ payload: 'test' }));

      it('should call search api', (selectResult) => {
        expect(selectResult).toEqual(call(searchForCharacters, 'test'));
        return {
          isOk: () => true,
          unwrap: () => ['data'],
        };
      });

      it('should put success action', (selectResult) => {
        expect(selectResult).toEqual(put(loadSearchResultsSuccess(['data'])));
      });
    });

    describe('fail', () => {
      const it = sagaHelper(loadSearchResults({ payload: 'test' }));

      it('should call search api', (selectResult) => {
        expect(selectResult).toEqual(call(searchForCharacters, 'test'));
        return {
          isOk: () => false,
          unwrap: () => { throw new Error('test'); },
        };
      });

      it('should put success action', (selectResult) => {
        expect(selectResult).toEqual(put(loadSearchResultsFail()));
        return {};
      });
    });
  });

  describe('loadMoreCharacters', () => {
    describe('success', () => {
      const it = sagaHelper(loadMoreCharacters());

      it('should select next link', (selectResult) => {
        expect(selectResult).toEqual(select(selectNext));
        return 'https://example.test.io';
      });

      it('should call search api', (selectResult) => {
        expect(selectResult).toEqual(call(fetchMoreCharacters, { next: 'https://example.test.io' }));
        return {
          isOk: () => true,
          unwrap: () => ['data'],
        };
      });

      it('should put success action', (selectResult) => {
        expect(selectResult).toEqual(put(loadMoreSuccess(['data'])));
      });
    });

    describe('fail', () => {
      const it = sagaHelper(loadMoreCharacters());

      it('should select next link', (selectResult) => {
        expect(selectResult).toEqual(select(selectNext));
        return 'https://example.test.io';
      });

      it('should call search api', (selectResult) => {
        expect(selectResult).toEqual(call(fetchMoreCharacters, { next: 'https://example.test.io' }));
        return {
          isOk: () => false,
          unwrap: () => { throw new Error('test'); },
        };
      });

      it('should put success action', (selectResult) => {
        expect(selectResult).toEqual(put(loadMoreFail()));
        return {};
      });
    });
  });
});
