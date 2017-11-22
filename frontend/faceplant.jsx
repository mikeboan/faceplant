import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';
import configureStore from './redux/configureStore';
import { normalize } from 'normalizr';
import { userSchema } from './redux/modules/schema';

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = window.currentUser || {};
  delete window.currentUser;
  const { entities, result } = normalize(currentUser, userSchema);

  const store = configureStore({
    users: { byId: { ...entities.users } },
    session: { currentUser: entities.users[result] }
  });
  debugger
  window.store = store; // debugging purposes only
  ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
  );
});
