// @flow
import Result, { Ok, Err } from 'lemons/Result';

import createFilter from './createFilter';

/* eslint-disable prefer-destructuring */
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 'the_api_endpoint_is_missing_in_env_parameters';
/* eslint-enable */

export const fetchCaracters = async ({
  skip,
  size,
}: {| +skip: number, +size: number |}): Promise<Result<Error, Character>> => {
  const range = new Array(size)
    .fill(1)
    .map((_, i) => i + skip + 1)
    .join();
  try {
    const result = await fetch(`${API_ENDPOINT}/character/${range}`);
    const json = await result.json();
    if (result.status === 200) {
      return Ok(json);
    }
    return Err(new Error(json.error));
  } catch (e) {
    console.error('Error fetching characters', e); // eslint-disable-line no-console
    return Err(e);
  }
};

export const fetchEpisodes = async ({
  skip,
  size,
}: {| +skip: number, +size: number |}): Promise<Result<Error, Episode>> => {
  const range = new Array(size)
    .fill(1)
    .map((_, i) => i + skip + 1)
    .join();
  try {
    const result = await fetch(`${API_ENDPOINT}/episode/${range}`);
    const json = await result.json();
    if (result.status === 200) {
      return Ok(json);
    }
    return Err(new Error(json.error));
  } catch (e) {
    console.error('Error fetching characters', e); // eslint-disable-line no-console
    return Err(e);
  }
};

type SearchResult = Promise<Result<Error, ApiResponse<Character>>>;

export const searchForCharacters = async (query: string): SearchResult => {
  try {
    const filter = createFilter(query);
    const result = await fetch(`${API_ENDPOINT}/character?${filter}`);
    const json = await result.json();
    if (result.status === 200) {
      return Ok(json);
    }
    return Err(new Error(json.error));
  } catch (e) {
    console.error('Error fetching characters', e); // eslint-disable-line no-console
    return Err(e);
  }
};

export const fetchCharacter = async (id: number | string): Promise<Result<Error, Character>> => {
  try {
    const result = await fetch(`${API_ENDPOINT}/character/${id}`);
    const json = await result.json();
    if (result.status === 200) {
      return Ok(json);
    }
    return Err(new Error(json.error));
  } catch (e) {
    console.error('Error fetching character', e); // eslint-disable-line no-console
    return Err(e);
  }
};
