import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  let errors = state.errors.auth[ownProps.fieldName];

  if (errors)
    errors = errors.join(", ");

  return { errors };
};

const SignUpFormError = ({ errors, focused }) => {
  if (!errors) return null;
  if (focused) return <div className='auth-error-tooltip'>{ errors }</div>;
  else         return <div className='auth-error'></div>;
};

export default connect(mapStateToProps)(SignUpFormError);
