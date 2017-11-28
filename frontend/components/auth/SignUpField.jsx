import React from 'react';

import SignUpError from './SignUpError';

class SignUpField extends React.Component {
  constructor(props) {
    super(props);

    this.state = { focused: false };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleFocus() {
    this.setState({ focused: true });
  }

  handleBlur() {
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
          type="text"
          onChange={ this.props.handleInput }
          onFocus={ this.handleFocus }
          onBlur={ this.handleBlur }
          placeholder={ placeholder }
        />
      </div>
    );
  }
}

export default SignUpField;
