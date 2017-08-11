import { combineReducers } from 'redux';

import { RECEIVE_PROFILE } from './profiles';
import { RECEIVE_LIKE, REMOVE_LIKE } from './likes';
import { commentSchema } from './schema';
import { generateSyncActions } from './shared';

// action types
export const POST_COMMENT = "POST_COMMENT";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

// sync actions
export const syncActions = generateSyncActions(
  [ RECEIVE_COMMENT, UPDATE_COMMENT, REMOVE_COMMENT ],
  commentSchema
);

// async actions
export const postComment = (comment) => dispatch => (
  api.postComment(comment).then(
    comment => dispatch(syncActions.receiveComment(comment))
  )
);

const api = {
  postComment: (comment) => $.ajax({
    url: `/api/comments/`,
    method: 'POST',
    data: { comment },
  }),
  fetchComments: () => $.ajax({
    url: `/api/comments`,
    method: 'GET'
  }),
  fetchComment: (id) => $.ajax({
    url: `/api/comments/${id}`,
    method: 'GET'
  }),
};

window.commentsApi = api;

// reducer
const commentsById = (oldState = {}, action) => {
  const newState = Object.assign({}, oldState);

  switch(action.type) {
    case RECEIVE_COMMENT:
      const id = action.result;
      return Object.assign({}, oldState, { [id]: action.entities.comments[id] });

    case RECEIVE_PROFILE:
      return Object.assign({}, oldState, action.entities.comments);

    case RECEIVE_LIKE:
      const like = action.entities.likes[action.result];
      if (like.likeable_type === 'Comment') {
        const comment = newState[like.likeable_id];
        comment.likes = [like.id, ...comment.likes];
        comment.likers = [like.liker_id, ...comment.likers];
      }
      return Object.assign({}, newState);

    case REMOVE_LIKE:
      const oldLike = action.entities.likes[action.result];
      const comment = newState[oldLike.likeable_id];
      comment.likes = comment.likes.filter( id => id !== oldLike.id );
      comment.likers = comment.likers.filter( id => id !== oldLike.liker_id );
      return newState;

    default:
      return oldState;
  }
};

export default combineReducers({
  byId: commentsById
});
