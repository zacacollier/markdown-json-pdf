import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'

import throttle from 'lodash/throttle'

import App from './App';
import { loadState, saveState } from './localStorage'
import './index.css';

const logger = createLogger();

const persistedState = loadState();
const initialState = {
  editor: {
    value: '',
  },
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'EDITOR_CHANGE':
      return { ...state, editor: { ...state.editor, value: action.edValue } }
    default:
      return state
  }
}

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(logger)
)
store.subscribe(() => {
  throttle(() => saveState(store.getState()), 1000)
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
