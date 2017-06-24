import React from 'react';
import { connect } from 'react-redux';

import { signup } from '../redux/modules/session';
import LogInHeader from './LoginHeader';

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

    this.props.signup(this.state).then(
      () => {
        this.setState({ email: "", password: "" });
        this.props.history.push('/');
      },
      () => this.setState({ password: "" })
    );
  }

  render() {
    return (
      <div>
        <LogInHeader />

        <h2>Sign Up</h2>
        <h3>It's free and always will be</h3>
        <form onSubmit={ this.handleSubmit.bind(this) }>
          <input type="text" onChange={ this.assignHandler('first_name') } placeholder="First Name"/>
          <input type="text" onChange={ this.assignHandler('last_name') } placeholder="Last Name"/>
          <input type="text" onChange={ this.assignHandler('email') } placeholder="Email Address"/>
          <input type="password" onChange={ this.assignHandler('password') } placeholder="Password"/>
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

export default connect (
  null,
  mapDispatchToProps
)(SignUpForm);
