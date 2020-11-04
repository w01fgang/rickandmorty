// @flow
import { HYDRATE } from 'next-redux-wrapper';
import { actionTypes, type Action } from './actions';

const initialState: GlobalState = {
  count: 0,
  query: '',
  searching: false,
  searchResults: [],
};

function reducer(state: GlobalState = initialState, action: Action) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }

    case actionTypes.MAKE_SEARCH:
      return { ...state, query: action.payload, searching: true };

    case actionTypes.LOAD_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        searching: false,
        searchResults: action.payload.results,
        count: action.payload.info.count,
      };

    case actionTypes.LOAD_SEARCH_RESULTS_FAIL:
      return { ...state, searching: false };

    default:
      return state;
  }
}

export default reducer;
