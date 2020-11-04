// @flow
import React, { memo } from 'react';

import Logo from './icons/Logo';

type Props = {||};

function BrandTitle() {
  return (
    <div className="container">
      <h1>The Rick and Morty</h1>
      <Logo width={90} height={90} />
      <style jsx>
        {`
          .container {
            display: flex;
            justify-content: center;
            flex: 0 0 100%;
          }

          .container h1 {
            position: absolute;
            color: #263238;
          }
        `}
      </style>
    </div>
  );
}
export default memo<Props>(BrandTitle);
