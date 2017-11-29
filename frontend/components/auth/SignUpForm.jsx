import React from 'react';
import { connect } from 'react-redux';

import { signup } from '../../redux/modules/session';
import { clearSingleAuthError } from '../../redux/modules/errors';
import LogInHeader from './LoginHeader';
import SignUpFormField from './SignUpField';

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signup(user)),
  clearLogInErrors: () => dispatch(clearSingleAuthError('credentials')),
});

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };

    this.assignHandler = this.assignHandler.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
  }

  assignHandler(field) {
    return (e) => {
      e.preventDefault();
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.clearLogInErrors();

    this.props.signup(this.state)
      .then(() => this.redirectTo("/"))
      .fail(() => this.setState({ password: "" }));
  }

  redirectTo(path) {
    if (this.props.history.location.pathname !== path) {
      this.props.history.push(path);
    }
  }

  render() {
    return (
      <div>
        <LogInHeader />

        <div className='content'>
          <div className='signup'>
            <div className='left'>
              <h3>{ "Connect with faces in the world around you" }</h3>
              <img
                src='https://www.facebook.com/rsrc.php/v3/yp/r/_1iT_csnL1u.png'>
              </img>
            </div>
            <div className='right'>
              <h2>Sign Up</h2>
              <h3>It's free and always will be</h3>

              <form
                className='sign-up-form'
                onSubmit={ this.handleSubmit.bind(this) }>
                <div className="name-fields">
                  <SignUpFormField
                    key={ 'first_name' }
                    fieldName={ 'first_name' }
                    handleInput={ this.assignHandler('first_name') }
                  />
                  <SignUpFormField
                    key={ 'last_name' }
                    fieldName={ 'last_name' }
                    handleInput={ this.assignHandler('last_name') }
                  />
                </div>
                <SignUpFormField
                  key={ 'email' }
                  fieldName={ 'email' }
                  handleInput={ this.assignHandler('email') }
                />
                <SignUpFormField
                  key={ 'password' }
                  fieldName={ 'password' }
                  handleInput={ this.assignHandler('password') }
                />
                <input
                  type="submit"
                  value="Create Account"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect (
  null,
  mapDispatchToProps
)(SignUpForm);
