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

export const editComment = (comment) => dispatch => (
  api.editComment(comment).then(
    comment => dispatch(syncActions.receiveComment(comment))
  )
);

export const deleteComment = (id) => dispatch => (
  api.deleteComment(id).then(
    comment => dispatch(syncActions.removeComment(comment))
  )
);

const api = {
  postComment: (comment) => $.ajax({
    url: `/api/comments/`,
    method: 'POST',
    data: { comment },
  }),
  editComment: (comment) => $.ajax({
    url: `/api/comments/${comment.id}`,
    method: 'PATCH',
    data: { comment },
  }),
  deleteComment: (id) => $.ajax({
    url: `/api/comments/${id}`,
    method: 'DELETE',
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

// reducer
const commentsById = (oldState = {}, action) => {
  let newState;
  let id;
  let newComment;

  switch(action.type) {
    case RECEIVE_COMMENT:
      newState = Object.assign({}, oldState);
      id = action.result;
      newComment = action.entities.comments[id];
      Object.assign(newState, { [id]: newComment });
      if (newComment.parent_id) {
        const parent = newState[newComment.parent_id];
        parent.replyIds = [...parent.replyIds, newComment.id];
      }
      return newState;

    case REMOVE_COMMENT:
      newState = Object.assign({}, oldState);
      id = action.result;
      newComment = action.entities.comments[id];
      delete newState[id];
      if (newComment.parent_id) {
        const parent = newState[newComment.parent_id];
        parent.replyIds = parent.replyIds.filter( replyId => replyId !== id )
      }
      return newState;

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
