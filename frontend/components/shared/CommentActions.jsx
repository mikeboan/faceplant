import React from 'react';
import { connect } from 'react-redux';

import { selectCommentLikers } from '../../selectors/selectors';
import { postLike } from '../../redux/modules/likes';

const mapStateToProps = (state, { commentId }) => ({
  likers: selectCommentLikers(state, commentId),
});

const mapDispatchToProps = (dispatch, { commentId }) => ({
  postLike: () => dispatch(postLike(commentId, "Comment")),
});

const CommentActions = ({ postLike, likers }) => (
  <div
    className='comment-actions'>
    <span onClick={ postLike }>Like</span> Reply Likes: { likers.length }
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(CommentActions);
