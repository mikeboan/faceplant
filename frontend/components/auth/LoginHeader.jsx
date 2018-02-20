import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { login } from '../../redux/modules/session';
import { clearAuthErrors } from '../../redux/modules/errors';

import SearchBar from '../search/SearchBar';

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.auth.credentials
});

const mapDispatchToProps = (dispatch) => ({
  login: user => dispatch(login(user)),
  clearAuthErrors: () => dispatch(clearAuthErrors())
});

class LogInHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    };
    this.assignHandler = this.assignHandler.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGuestLogin = this.handleGuestLogin.bind(this);
  }

  assignHandler(field) {
    return (e) => {
      e.preventDefault();
      this.setState({
        [field]: e.currentTarget.value
      });
    }
  }

  handleSubmit(e) {
    e ? e.preventDefault() : null;

    this.props.clearAuthErrors();

    this.props.login(this.state)
      .then(() => this.redirectTo("/"))
      .fail(() => this.setState({ password: "" }));
  }

  handleGuestLogin(e) {
    e.preventDefault();

    this.props.clearAuthErrors();

    const email = "michael@bluth.com";
    const password = "starwars";
    let idx = 0;
    let time = 100;

    const type = () => {
      this.setState(
        idx <= email.length ?
          { email: email.slice(0, idx) } :
          { password: password.slice(0, idx - email.length) },
        () => {
          if (idx++ <= email.length + password.length) {
            setTimeout(type, time);
            time -= 5;
          } else {
            this.handleSubmit();
          }
        }
      );
    };

    type();
  }

  redirectTo(path) {
    if (this.props.history.location.pathname !== path) {
      this.props.history.push(path);
    }
  }

  errorTooltip() {
    const { errors } = this.props;
    if (errors)
      return <div className='login-error-tooltip'>{ errors.join(", ") }</div>;
  }

  render() {
    return (
      <header className='login-header'>
        <div className='logo-frame'>
          <h1>faceplant</h1>
        </div>
        <form onBlur={ this.props.clearAuthErrors }
          className='login-form'
          onSubmit={ this.handleSubmit.bind(this) }
        >
          { this.errorTooltip() }
          <label>Email
            <input
              type="text"
              onChange={ this.assignHandler('email') }
              value={ this.state.email }
            />
          </label>
          <label>Password
            <input
              type="password"
              onChange={ this.assignHandler('password') }
              value={ this.state.password }
            />
          </label>
          <input type="submit" value="Log In"></input>
          <button onClick={ this.handleGuestLogin }>Guest</button>
        </form>
      </header>
    );
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(LogInHeader));
