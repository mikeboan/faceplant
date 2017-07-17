import React from 'react';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Header from './Header';
import SignUpForm from './SignUpForm';
import Main from './Main';
import ScrollToTop from './ScrollToTop';

const App = ({ children }) => (
  <section className='app'>
    <ScrollToTop>
      <Switch>
        <AuthRoute path="/signup" component={SignUpForm} />
        <ProtectedRoute path="/" component={Main} />
      </Switch>
    </ScrollToTop>
  </section>
);

export default App;
