import React from 'react';
import { connect } from 'react-redux';

import { showModal } from '../../redux/modules/modal';
import PostFormEditModalContainer from './PostFormEditModalContainer';
import DeletePostPrompt from './DeletePostPrompt';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, { post }) => ({
  // showEditForm: () => dispatch(showModal(<PostFormModal />)),
  showEditForm: () => dispatch(showModal(<PostFormEditModalContainer post={post} />)),
  showDeletePrompt: () => dispatch(showModal(<DeletePostPrompt post={post} />)),
});

const PostNav = ({ showEditForm, showDeletePrompt }) => (
  <nav>
    <i className="fa fa-pencil" aria-hidden="true" onClick={showEditForm}></i>
    <i className="fa fa-trash" aria-hidden="true" onClick={showDeletePrompt}></i>
  </nav>
);

export default connect(mapStateToProps, mapDispatchToProps)(PostNav);
