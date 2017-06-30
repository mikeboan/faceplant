import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';
import { logout } from '../redux/modules/session';

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

class Header extends React.Component {

  logoutAndRedirect(e) {
    e.preventDefault();
    this.props.logout().then(() => this.props.history.push('/signup'));
  }

  render() {
    return (
      <header className='header'>
        <div className='content'>
          <div className='header-left'>
            <span className='logo'></span>
            <SearchBar />
          </div>
          <div className='header-right'>
            <nav>
              <Link to={`/users/${this.props.currentUser.id}`}>
                <img src={this.props.currentUser.profilePicUrl} />
                { this.props.currentUser.first_name }
              </Link>
              <Link to='/'>
                Home
              </Link>
            </nav>
            <button onClick={ this.logoutAndRedirect.bind(this) }>
              Log Out
            </button>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
