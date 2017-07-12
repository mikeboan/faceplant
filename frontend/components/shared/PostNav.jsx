import React from 'react';
import { connect } from 'react-redux';

import { showModal } from '../../redux/modules/modal';
// import PostFormModal from './PostFormModal';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // showEditForm: () => dispatch(showModal(<PostFormModal />)),
  showEditForm: () => {},
  showDeleteForm: () => {}
});

const PostNav = ({ post, showEditForm, showDeletePrompt }) => (
  <nav>
    <i className="fa fa-pencil" aria-hidden="true" onClick={showEditForm}></i>
    <i className="fa fa-trash" aria-hidden="true" onClick={showDeletePrompt}></i>
  </nav>
);

export default PostNav;
