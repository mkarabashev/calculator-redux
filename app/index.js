import { render } from 'react-dom';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import record from './reducers';
import App from './containers/App';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

render(
  <Provider store={createStoreWithMiddleware(record)}>
    <App />
  </Provider>,
  document.getElementById('root')
)
