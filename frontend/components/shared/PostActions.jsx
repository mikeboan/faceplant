import React from 'react';
import { connect } from 'react-redux';

import { postLike, deleteLike } from '../../redux/modules/likes';
import { selectItemLikers, currentUserLikesItem } from '../../selectors/selectors';

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
  } = props;

  const clickAction = likedByCurrentUser ? deleteLike : postLike;
  const likeText = likedByCurrentUser ? "Unlike" : "Like";

  return (
    <ul className='post-actions'>
      <li>
        <span onClick={ clickAction }>{ likeText }</span>
      </li>

      <li>
        Likes: { likers.length }
      </li>
    </ul>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PostActions);
