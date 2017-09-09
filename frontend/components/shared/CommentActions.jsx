import React from 'react';
import { connect } from 'react-redux';

import { selectItemLikers, currentUserLikesItem } from '../../selectors/selectors';
import { postLike, deleteLike } from '../../redux/modules/likes';

const mapStateToProps = (state, { commentId }) => ({
  likers: selectItemLikers(state, commentId, 'comment'),
  likedByCurrentUser: currentUserLikesItem(state, commentId, 'comment'),
});

const mapDispatchToProps = (dispatch, { commentId, likedByCurrentUser }) => ({
  postLike: () => dispatch(postLike(commentId, "Comment")),
  deleteLike: () => dispatch(deleteLike(commentId, "Comment")),
});

const CommentActions = (props) => {
  const {
    likers,
    likedByCurrentUser,
    postLike,
    deleteLike,
    commentableId,
    toggleCommentForm
  } = props;

  const clickAction = likedByCurrentUser ? deleteLike : postLike;
  const likeText = likedByCurrentUser ? "Unlike" : "Like";

  return (
    <ul className='comment-actions'>
      <li>
        <span onClick={ clickAction }>{ likeText }</span>
      </li>
      <li onClick={ toggleCommentForm }>
        <span>Reply</span>
      </li>
      <li>
        Likes: { likers.length }
      </li>
    </ul>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentActions);
