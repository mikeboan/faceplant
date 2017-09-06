import React from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Header from './Header';
import SignUpForm from './SignUpForm';
import Main from './Main';
import ScrollToTop from './ScrollToTop';
import { hideAllDropdowns } from '../redux/modules/dropdowns';

const mapDispatchToProps = dispatch => ({
  hideAllDropdowns: () => dispatch(hideAllDropdowns())
});

const App = ({ children, hideAllDropdowns }) => (
  <section className='app' onClick={ hideAllDropdowns }>
    <ScrollToTop>
      <Switch>
        <AuthRoute path="/signup" component={SignUpForm} />
        <ProtectedRoute path="/" component={Main} />
      </Switch>
    </ScrollToTop>
  </section>
);

export default withRouter(connect(null, mapDispatchToProps)(App));
