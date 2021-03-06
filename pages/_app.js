// @flow
import React from 'react';

import { wrapper } from '../lib/store';

import Footer from '../components/Footer';

function App({ Component, pageProps }: $FlowFixMeProps) {
  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
      <Footer />
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
