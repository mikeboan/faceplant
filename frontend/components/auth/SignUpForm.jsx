import React from 'react';
import { connect } from 'react-redux';

import { signup } from '../../redux/modules/session';
import LogInHeader from './LoginHeader';
import SignUpFormField from './SignUpField';

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signup(user))
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
              <h3>Connect with faces in the world around you</h3>
              <img src='https://www.facebook.com/rsrc.php/v3/yp/r/_1iT_csnL1u.png'></img>
            </div>
            <div className='right'>
              <h2>Sign Up</h2>
              <h3>It's free and always will be</h3>

              <form
                className='sign-up-form'
                onSubmit={ this.handleSubmit.bind(this) }>
                <div className="name-fields">
                  {
                    ['first_name', 'last_name']
                      .map( fieldName =>
                        <SignUpFormField
                          key={ fieldName }
                          fieldName={ fieldName }
                          handleInput={ this.assignHandler(fieldName) }
                        />
                      )
                  }
                </div>

                {
                  ['email', 'password']
                    .map( fieldName =>
                      <SignUpFormField
                        key={ fieldName }
                        fieldName={ fieldName }
                        handleInput={ this.assignHandler(fieldName) }
                      />
                    )
                }

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
