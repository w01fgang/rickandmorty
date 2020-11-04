// @flow
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { makeSearch, setQuery } from '../lib/actions';
import createFilter from '../lib/createFilter';

import SearchIcon from './icons/Search';
import Button from './Button';

export default function SearchBar() {
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

  return (
    <>
      <div className="container">
        <div className="icon-container">
          <SearchIcon width={20} height={20} />
        </div>
        <div className="input-container">
          <input type="text" placeholder="Search for anything" onChange={handleChange} onKeyDown={handleEnterKey} value={query} />
        </div>
      </div>
      <div className="button-container">
        <Button onClick={handleSearch}>Search</Button>
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
          .button-container {
            margin-left: 16px;
          }
          `}
      </style>
    </>
  );
}
