import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../redux/modules/modal';

const mapStateToProps = (state, ownProps) => ({
  component: state.modal.component,
  visible: Boolean(state.modal.component)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideModal: () => dispatch(hideModal()),
});

const Modal = ({ component, visible, hideModal }) => (
  <div className={ visible ? "modal-screen" : "hidden" } onClick={ hideModal }>
    <div className="modal-content" onClick={ e => e.stopPropagation() }>
      { component }
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
