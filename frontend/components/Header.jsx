import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { logout } from '../redux/modules/session';

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

const Header = ({ logout, history }) => {
  const _logoutAndRedirect = (e) => {
    e.preventDefault();
    logout().then(() => history.push('/signup'));
  };

  return (
    <div>
      <button onClick={ _logoutAndRedirect }>Log Out</button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
