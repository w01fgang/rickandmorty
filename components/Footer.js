// @flow
import React, { memo } from 'react';

type Props = {||};

function Footer() {
  return (
    <div className="container">
      <div>
        <b>
          <span>Based on</span>
          <a href="https://rickandmortyapi.com/">
            The Rick and Morty API
          </a>
        </b>
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            background: #eceff1;
            border-top: 1px solid #cfd8dc;
            color: rgba(0, 0, 0, 0.54);
          }

          .container span {
            margin-right: 5px;
          }

          .container a {
            color: inherit;
          }
        `}
      </style>
    </div>
  );
}

export default memo<Props>(Footer);
