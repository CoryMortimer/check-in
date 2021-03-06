import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router';
import CssBaseline from '@material-ui/core/CssBaseline';
// import * as serviceWorker from './serviceWorker';
import { SWRConfig } from 'swr';
import httpRequest from './utils/httpRequest';


ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: (...args) => httpRequest.get(...args).then(res => res.data)
      }}
    >
      <CssBaseline />
      <Router />
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
