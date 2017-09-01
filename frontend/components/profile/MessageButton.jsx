import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

const MessageButton = ({ buttonText, buttonAction, disabled }) => (
  <button
    className="message-button"
    onClick={ (e) => { e.preventDefault; buttonAction() } }
  >
    ToDo: Messages
  </button>
);

export default connect(mapStateToProps, mapDispatchToProps)(MessageButton);
