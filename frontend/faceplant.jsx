import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';
import configureStore from './redux/configureStore';

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = window.currentUser || {};
  delete window.currentUser;
  const store = configureStore({ session: { currentUser } });
  window.store = store;

  window.store = store; // debugging purposes only
  ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
  );
});
