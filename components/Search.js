// @flow
import React from 'react';

import Logo from './icons/Logo';
import SearchBar from './SearchBar';

type Props = {|
  +fullScreen?: boolean,
|};

export default function Search({ fullScreen }: Props) {
  return (
    <div className="container">
      <div className="logo-container">
        <h1>The Rick and Morty</h1>
        <Logo width={90} height={90} />
      </div>
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

          .logo-container {
            display: flex;
            justify-content: center;
            flex: 0 0 100%;
          }

          .logo-container h1 {
            position: absolute;
          }

          .search-container {
            flex: 1 1 auto;
            max-width: 584px;
            margin: 0 40px;
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
