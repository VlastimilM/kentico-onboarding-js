import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { logger } from 'redux-logger';
import { createStore, applyMiddleware, Store } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App.jsx';
import './index.css';
import { app, IStore } from './reducers/appReducer';

const store: Store<IStore> = createStore(app, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
