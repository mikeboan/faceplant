import React from 'react';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Header from './Header';
import SignUpForm from './SignUpForm';
import Main from './Main';

const App = ({ children }) => (
  <section className='app'>
    <Switch>
      <AuthRoute path="/signup" component={SignUpForm} />
      <ProtectedRoute path="/" component={Main} />
    </Switch>
  </section>
);

export default App;
