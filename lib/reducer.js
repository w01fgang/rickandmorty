// @flow
import { HYDRATE } from 'next-redux-wrapper';
import { actionTypes, type Action } from './actions';

const initialState: GlobalState = {
  page: 0,
  count: 0,
  query: '',
  searching: false,
  searchResults: [],
  episodes: [],
  next: null,
};

function reducer(state: GlobalState = initialState, action: Action) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }

    case actionTypes.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    case actionTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case actionTypes.MAKE_SEARCH:
      return {
        ...state,
        query: action.payload,
        searching: true,
        page: 0,
      };

    case actionTypes.GET_ALL_CHARACTERS_SUCCESS:
    case actionTypes.LOAD_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        searching: false,
        searchResults: action.payload.results,
        count: action.payload.info.count,
        next: action.payload.info.next,
      };

    case actionTypes.LOAD_MORE_CHARACHTERS:
      return {
        ...state,
        searching: true,
      };

    case actionTypes.LOAD_MORE_CHARACHTERS_SUCCESS:
      return {
        ...state,
        searching: false,
        searchResults: [
          ...state.searchResults,
          ...action.payload.results,
        ],
        count: action.payload.info.count,
        next: action.payload.info.next,
      };

    case actionTypes.LOAD_MORE_CHARACHTERS_FAIL:
      return {
        ...state,
        searching: false,
      };

    case actionTypes.GET_ALL_CHARACTERS_FAIL:
    case actionTypes.LOAD_SEARCH_RESULTS_FAIL:
      return {
        ...state,
        searching: false,
        searchResults: [],
      };

    case actionTypes.LOAD_CHARACHTER_EPISODES_SUCCESS:
      return {
        ...state,
        episodes: Array.isArray(action.payload) ? action.payload : [action.payload],
      };

    case actionTypes.LOAD_CHARACHTER_EPISODES_FAIL:
      return {
        ...state,
        episodes: [],
      };

    default:
      return state;
  }
}

export default reducer;
