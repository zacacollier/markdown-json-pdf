import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import App from './App';
import './index.css';

const logger = createLogger();

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

const storeWithMiddleware = applyMiddleware(logger)(createStore)
const store = storeWithMiddleware(rootReducer, initialState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
