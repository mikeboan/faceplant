import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

import { selectCurrentUser } from '../selectors/selectors';

const Auth = ({ component: Component, path, loggedIn }) => (
  <Route path={path} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />
);

const Protected = ({ component: Component, path, loggedIn }) => (
  <Route path={path} render={(props) => (
     loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/signup" />
    )
  )} />
);

const Loading = ({ component: Component, path, loading }) => (
  <Route path={path} render={(props) => (
     loading ? (
       <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    ) : (
      <Component {...props} />
    )
  )} />
);

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.currentUser.id),
  loading: state.loading
});

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
export const LoadingRoute = withRouter(connect(mapStateToProps, null)(Loading));
