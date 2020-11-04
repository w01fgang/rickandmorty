// @flow
export const actionTypes = {
  HYDRATE: ('HYDRATE': 'HYDRATE'),
  MAKE_SEARCH: ('MAKE_SEARCH': 'MAKE_SEARCH'),
  LOAD_SEARCH_RESULTS_SUCCESS: ('LOAD_SEARCH_RESULTS_SUCCESS': 'LOAD_SEARCH_RESULTS_SUCCESS'),
  LOAD_SEARCH_RESULTS_FAIL: ('LOAD_SEARCH_RESULTS_FAIL': 'LOAD_SEARCH_RESULTS_FAIL'),
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

export function loadSearchResultsFail() {
  return {
    type: actionTypes.LOAD_SEARCH_RESULTS_FAIL,
  };
}

export type Action =
 | {| type: "HYDRATE", payload: GlobalState |}
 | $Call<typeof makeSearch, string>
 | $Call<typeof loadSearchResultsSuccess, ApiResponse<Character>>
 | $Call<typeof loadSearchResultsFail>;
