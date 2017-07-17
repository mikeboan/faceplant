import React from 'react';
import { connect } from 'react-redux';

import DeletePrompt from './DeletePrompt';
import PostFormEditModalContainer from './PostFormEditModalContainer';
import { showModal, hideModal } from '../../redux/modules/modal';
import { deletePost } from '../../redux/modules/posts';

const mapStateToProps = (state) => ({
  type: "post"
});

const mapDispatchToProps = (dispatch, { post }) => ({
  confirm: () => dispatch(deletePost(post.id)),
  edit: () => dispatch(showModal(<PostFormEditModalContainer post={post} />)),
  hideModal: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeletePrompt);
