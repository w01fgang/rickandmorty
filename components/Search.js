// @flow
import React from 'react';

import SearchBar from './SearchBar';
import BrandTitle from './BrandTitle';

type Props = {|
  +fullScreen?: boolean,
|};

export default function Search({ fullScreen }: Props) {
  return (
    <div className="container">
      <BrandTitle />
      <div className="search-container">
        <SearchBar />
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
            flex-wrap: wrap;
            width: 100vw;
            height: ${fullScreen ? '100vh' : '280px'};
          }

          .search-container {
            display: flex;
            flex: 1 1 auto;
            max-width: 584px;
            margin: 0 40px;
            align-items: center;
          }

          @media (max-width: 440px) {
            .search-container {
              margin: 0 8px;
            }
          }
          `}
      </style>
    </div>
  );
}
