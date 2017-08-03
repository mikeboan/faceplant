import React from 'react';
import { connect } from 'react-redux';

import { selectCommentLikers, currentUserLikesComment } from '../../selectors/selectors';
import { postLike, deleteLike } from '../../redux/modules/likes';

const mapStateToProps = (state, { commentId }) => ({
  likers: selectCommentLikers(state, commentId),
  currentUserLikesComment: currentUserLikesComment(state, commentId),
});

const mapDispatchToProps = (dispatch, { commentId, currentUserLikesComment }) => {
  let clickAction = postLike;
  let likeText = "Like";

  if (currentUserLikesComment) {
    clickAction = deleteLike;
    likeText = "Unlike";
  }

  return {
    clickAction: () => dispatch(clickAction(commentId, "Comment")),
    likeText
  };
};

const CommentActions = ({ clickAction, likeText, likers }) => (
  <div
    className='comment-actions'>
    <span onClick={ postLike }>{ likeText }</span> Reply Likes: { likers.length }
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(CommentActions);
