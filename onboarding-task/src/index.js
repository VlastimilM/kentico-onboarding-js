import React from 'react';
import ReactDOM from 'react-dom';
import { logger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App.jsx';
import './index.css';
import { app } from './reducers/appReducer.ts';

const store = createStore(app, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
