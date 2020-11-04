// @flow
export const actionTypes = {
  HYDRATE: ('HYDRATE': 'HYDRATE'),
  SET_PAGE: ('SET_PAGE': 'SET_PAGE'),
  SET_QUERY: ('SET_QUERY': 'SET_QUERY'),
  MAKE_SEARCH: ('MAKE_SEARCH': 'MAKE_SEARCH'),
  LOAD_SEARCH_RESULTS_SUCCESS: ('LOAD_SEARCH_RESULTS_SUCCESS': 'LOAD_SEARCH_RESULTS_SUCCESS'),
  LOAD_SEARCH_RESULTS_FAIL: ('LOAD_SEARCH_RESULTS_FAIL': 'LOAD_SEARCH_RESULTS_FAIL'),
  LOAD_MORE_CHARACHTERS: ('LOAD_MORE_CHARACHTERS': 'LOAD_MORE_CHARACHTERS'),
  LOAD_MORE_CHARACHTERS_SUCCESS: ('LOAD_MORE_CHARACHTERS_SUCCESS': 'LOAD_MORE_CHARACHTERS_SUCCESS'),
  LOAD_MORE_CHARACHTERS_FAIL: ('LOAD_MORE_CHARACHTERS_FAIL': 'LOAD_MORE_CHARACHTERS_FAIL'),
};

export function makeSearch(query: string) {
  return { type: actionTypes.MAKE_SEARCH, payload: query };
}

export function loadSearchResultsSuccess(data: ApiResponse<Character>) {
  return {
    type: actionTypes.LOAD_SEARCH_RESULTS_SUCCESS,
    payload: data,
  };
}

export function setPage(page: number) {
  return {
    type: actionTypes.SET_PAGE,
    payload: page,
  };
}

export function setQuery(query: string) {
  return {
    type: actionTypes.SET_QUERY,
    payload: query,
  };
}

export function loadSearchResultsFail() {
  return {
    type: actionTypes.LOAD_SEARCH_RESULTS_FAIL,
  };
}

export function searchMoreCharacters() {
  return {
    type: actionTypes.LOAD_SEARCH_RESULTS_FAIL,
  };
}

export function getMoreCharacters() {
  return {
    type: actionTypes.LOAD_MORE_CHARACHTERS,
  };
}

export function loadMoreSuccess(data: ApiResponse<Character>) {
  return {
    type: actionTypes.LOAD_MORE_CHARACHTERS_SUCCESS,
    payload: data,
  };
}

export function loadMoreFail() {
  return {
    type: actionTypes.LOAD_MORE_CHARACHTERS_FAIL,
  };
}

export type Action =
 | {| type: "HYDRATE", payload: GlobalState |}
 | $Call<typeof makeSearch, string>
 | $Call<typeof loadSearchResultsSuccess, ApiResponse<Character>>
 | $Call<typeof loadSearchResultsFail>
 | $Call<typeof loadMoreSuccess, ApiResponse<Character>>
 | $Call<typeof loadMoreFail>
 | $Call<typeof searchMoreCharacters>;
