import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css';
import App from './App';
import { Provider } from 'react-redux'

import store from './store'
import { fetchApiStatus } from './store/apiStatusSlice'

store.dispatch(fetchApiStatus)

ReactDOM.render(
  <React.StrictMode>
    <Provider store>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
