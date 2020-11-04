// @flow
import { applyMiddleware, createStore, type Dispatch } from 'redux';
import createSagaMiddleware from 'redux-saga';
// $FlowFixMe[missing-export]
import { createWrapper } from 'next-redux-wrapper';

import rootReducer from './reducer';
import rootSaga from './saga';
import type { Action } from './actions';

const debug = process.env.NODE_ENV !== 'production';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable global-require */
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  /* eslint-disable max-len */
  const store = createStore<GlobalState, Action, Dispatch<Action>>(rootReducer, bindMiddleware([sagaMiddleware]));
  /* eslint-enable */
  // $FlowIgnore[prop-missing]
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug });
