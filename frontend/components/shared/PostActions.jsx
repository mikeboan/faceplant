import React from 'react';
import { connect } from 'react-redux';

import { postLike, deleteLike } from '../../redux/modules/likes';
import { selectItemLikers, currentUserLikesItem } from '../../selectors/selectors';
import Likers from './Likers';

const mapStateToProps = (state, { postId }) => ({
  likers: selectItemLikers(state, postId, 'post'),
  likedByCurrentUser: currentUserLikesItem(state, postId, 'post'),
});

const mapDispatchToProps = (dispatch, { postId }) => ({
  postLike: () => dispatch(postLike(postId, 'Post')),
  deleteLike: () => dispatch(deleteLike(postId, 'Post')),
});

const PostActions = (props) => {
  const {
    likers,
    likedByCurrentUser,
    postLike,
    deleteLike,
    focusCommentBox
  } = props;

  const clickAction = likedByCurrentUser ? deleteLike : postLike;
  const image = likedByCurrentUser ? window.staticImages.unlike : window.staticImages.like;

  return (
    <ul className='post-actions'>
      <li onClick={ clickAction }>
        <img src={ image }></img>
        <span className={ likedByCurrentUser ? "liked" : "unliked" }>Like</span>
      </li>

      <li onClick={ focusCommentBox }>
        <img src={ window.staticImages.commentBubble }></img>
        <span>Comment</span>
      </li>

    </ul>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PostActions);
