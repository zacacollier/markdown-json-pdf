import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import throttle from 'lodash/throttle';

import App from './App';
import { saveState } from './localStorage';
import { initialState, rootReducer } from './reducers';
import './index.css';

const logger = createLogger();
// const persistedState = loadState();
export const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk, logger)),
);

store.subscribe(() => throttle(() => saveState(store.getState()), 1000));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
