import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';

import throttle from 'lodash/throttle';

import App from './containers/App';
import { saveState } from './constants/localStorage';
import { initialState, rootReducer } from './reducers/index';
import './styles/index.css';

const logger = createLogger();
export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    compose(applyMiddleware(thunk, logger)),
  )
);

store.subscribe(() => throttle(() => saveState(store.getState()), 1000));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
