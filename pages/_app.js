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
            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
          }
        `}
      </style>
    </>
  );
}

export default wrapper.withRedux(App);
