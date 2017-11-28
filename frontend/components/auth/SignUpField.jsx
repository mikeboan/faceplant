import React from 'react';
import { connect } from 'react-redux';

import SignUpError from './SignUpError';
import {
  receiveSingleAuthError,
  clearSingleAuthError
} from '../../redux/modules/errors';

const mapDispatchToProps = (dispatch, { fieldName }) => ({
  clearError: () => dispatch(clearSingleAuthError(fieldName)),
  showError: (messages) =>
    dispatch(receiveSingleAuthError({ [fieldName]: messages }))
});

class SignUpField extends React.Component {
  constructor(props) {
    super(props);

    this.state = { focused: false };

    this.input = this.input || {};
    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleInput(e) {
    if (this.input.value.length > 0) this.props.clearError();
    this.props.handleInput(e);
  }

  handleFocus() {
    this.setState({ focused: true });
  }

  handleBlur() {
    if (this.input.value.length === 0)
      this.props.showError(["can't be blank"]);
    if (this.input.value.length > 0)
      this.props.clearError();
    this.setState({ focused: false });
  }

  render() {
    const { fieldName } = this.props;
    const placeholder =
      fieldName
        .split("_")
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ");

    return (
      <div className='auth-field' >
        <SignUpError fieldName={fieldName} focused={ this.state.focused }/>
        <input
          ref={ input => { this.input = input; } }
          type={ fieldName === 'password' ? 'password' : 'text' }
          onChange={ this.handleInput }
          onFocus={ this.handleFocus }
          onBlur={ this.handleBlur }
          placeholder={ placeholder }
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(SignUpField);
