import React from 'react';
import { connect } from 'react-redux';

import DeletePrompt from './DeletePrompt';
import EditModalContainer from './EditModalContainer';
import { showModal, hideModal } from '../../redux/modules/modal';
import { deletePost } from '../../redux/modules/posts';
import { deleteComment } from '../../redux/modules/comments';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch, { item, type }) => {
  const deleteAction = type === 'post' ? deletePost : deleteComment;

  return ({
    confirm: () => dispatch(deleteAction(item.id)),
    edit: () => dispatch(showModal(<EditModalContainer item={item} />)),
    hideModal: () => dispatch(hideModal()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(DeletePrompt);
