// @flow
import React from 'react';
import { wrapper } from '../lib/store';

function App({ Component, pageProps }: $FlowFixMeProps) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>
        {`
          body {
            margin: 0;
          }
        `}
      </style>
    </>
  );
}

export default wrapper.withRedux(App);
