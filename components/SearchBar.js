// @flow
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { makeSearch, setQuery } from '../lib/actions';
import createFilter from '../lib/createFilter';

import SearchIcon from './icons/Search';
import CrossIcon from './icons/Cross';
import Button from './Button';

type Props = {|
  +onReset?: () => void,
|};

export default function SearchBar({ onReset }: Props) {
  const dispatch = useDispatch();
  const query = useSelector((state: GlobalState) => state.query);
  const router = useRouter();

  const handleChange = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.currentTarget.value));
  };

  const handleSearch = () => {
    dispatch(makeSearch(query));
    router.push(`/results?${createFilter(query)}`);
  };

  const handleEnterKey = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const reset = () => {
    dispatch(setQuery(''));
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="container">
      <div className="icon-container">
        <SearchIcon width={20} height={20} />
      </div>

      <div className="input-container">
        <input type="text" placeholder="Search for anything" onChange={handleChange} onKeyDown={handleEnterKey} value={query} />
      </div>

      {query && (
        <div className="crear-container">
          <button type="button" onClick={reset}>
            <CrossIcon width={20} height={20} />
          </button>
        </div>
      )}

      <div className="button-container">
        <Button onClick={handleSearch} round>
          <SearchIcon width={24} height={24} color="#eceff1" />
        </Button>
      </div>
      <style jsx>
        {`
          .container {
            background: #fff;
            display: flex;
            border: 1px solid #dfe1e5;
            box-shadow: none;
            border-radius: 24px;
            height: 44px;
            margin: 0 auto;
            width: auto;
            flex: 1 1 auto;
          }

          .icon-container {
            display: flex;
            align-items: center;
            padding-left: 13px;
          }

          .input-container {
            flex: 1;
            display: flex;
            padding: 5px 8px 0 16px;
            padding-left: 14px;
          }

          .input-container input {
            background-color: transparent;
            -webkit-tap-highlight-color: transparent;
            border: none;
            margin: 0;
            padding: 0;
            word-wrap: break-word;
            outline: none;
            flex: 0 1 480px;
            height: 34px;
            font-size: 16px;
          }

          .crear-container {
            display: flex;
            align-items: center;
            padding-right: 6px;
          }

          .crear-container button {
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            cursor: pointer;
          }

          .crear-container button:focus {
            outline: none;
          }

          .button-container {
            display: flex;
            align-items: center;
            padding-right: 6px;
          }
        `}
      </style>
    </div>
  );
}
