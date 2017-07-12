import React from 'react';
import { connect } from 'react-redux';

import { showModal } from '../../redux/modules/modal';
import PostFormEditModalContainer from './PostFormEditModalContainer';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // showEditForm: () => dispatch(showModal(<PostFormModal />)),
  showEditForm: () => dispatch(showModal(<PostFormEditModalContainer post={ownProps.post} />)),
  showDeleteForm: () => {}
});

const PostNav = ({ showEditForm, showDeletePrompt }) => (
  <nav>
    <i className="fa fa-pencil" aria-hidden="true" onClick={showEditForm}></i>
    <i className="fa fa-trash" aria-hidden="true" onClick={showDeletePrompt}></i>
  </nav>
);

export default connect(mapStateToProps, mapDispatchToProps)(PostNav);
