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

const CommentActions = (props) => {
  const { likers, likedByCurrentUser, postLike, deleteLike, commentableId } = props;
  const clickAction = likedByCurrentUser ? deleteLike : postLike;
  const likeText = likedByCurrentUser ? "Unlike" : "Like";

  return (
    <ul className='comment-actions'>
      <li>
        <span onClick={ clickAction }>{ likeText }</span>
      </li>
      <li>
        <label htmlFor={`post-#{commentableId}`}>Reply</label>
      </li>
      <li>
        Likes: { likers.length }
      </li>
    </ul>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentActions);
