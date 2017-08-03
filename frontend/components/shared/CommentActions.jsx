import React from 'react';
import { connect } from 'react-redux';

import { selectCommentLikers, currentUserLikesComment } from '../../selectors/selectors';
import { postLike, deleteLike } from '../../redux/modules/likes';

const mapStateToProps = (state, { commentId }) => ({
  likers: selectCommentLikers(state, commentId),
  likedByCurrentUser: currentUserLikesComment(state, commentId),
});

const mapDispatchToProps = (dispatch, { commentId, likedByCurrentUser }) => ({
  postLike: () => dispatch(postLike(commentId, "Comment")),
  deleteLike: () => dispatch(deleteLike(commentId, "Comment")),
});

const CommentActions = ({ likers, likedByCurrentUser, postLike, deleteLike }) => {
  const clickAction = likedByCurrentUser ? deleteLike : postLike;
  const likeText = likedByCurrentUser ? "Unlike" : "Like";

  return (
  <div
    className='comment-actions'>
    <span onClick={ clickAction }>{ likeText }</span> Reply Likes: { likers.length }
  </div>
)};

export default connect(mapStateToProps, mapDispatchToProps)(CommentActions);
