import { combineReducers } from 'redux';

import { RECEIVE_PROFILE } from './profiles';
import { RECEIVE_COMMENT } from './comments';
import { postSchema } from './schema';
import { generateSyncActions } from './shared';

// action types
export const POST_POST = "POST_POST";
export const RECEIVE_POST = "RECEIVE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const REMOVE_POST = "REMOVE_POST";

export const syncActions = generateSyncActions(
  [ RECEIVE_POST, UPDATE_POST, REMOVE_POST ],
  postSchema
);

// async actions
export const postPost = (post, profileUserId) => dispatch => (
  api.postPost(post, profileUserId).then(
    post => dispatch(syncActions.receivePost(post))
  )
);

export const editPost = (post) => dispatch => (
  api.editPost(post).then(
    post => dispatch(syncActions.updatePost(post))
  )
);

export const deletePost = (id) => dispatch => (
  api.deletePost(id).then(
    post => dispatch(syncActions.removePost(post))
  )
);

const api = {
  postPost: (post, profileUserId) => $.ajax({
    url: `/api/profiles/${profileUserId}/posts/`,
    method: 'POST',
    data: { post },
  }),

  fetchPost: (id) => $.ajax({
    url: `api/posts/${id}`,
    method: 'GET'
  }),

  editPost: ({ id, ...post }) => $.ajax({
    url: `/api/posts/${id}`,
    method: 'PATCH',
    data: { post },
  }),

  deletePost: (id) => $.ajax({
    url: `/api/posts/${id}`,
    method: 'DELETE',
  }),
};

window.postsApi = api;

// reducer
const postsById = (oldState = {}, action) => {
  const newState = Object.assign({}, oldState);

  switch(action.type) {
    case UPDATE_POST:
    case RECEIVE_POST:
      return Object.assign({}, oldState, action.entities.posts);

    case REMOVE_POST:
      Object.keys(action.entities.posts).forEach( id =>
        delete newState[id]
      );
      return newState;

    case RECEIVE_PROFILE:
      return Object.assign(
        {},
        oldState,
        action.entities.posts
      );

    case RECEIVE_COMMENT:
      const comment = action.entities.comments[action.result];
      const post = newState[comment.commentable_id];
      post.comments = [...post.comments, comment.id];
      if (!comment.parent_id) post.replyIds = [...post.replyIds, comment.id];
      return newState;


    default:
      return oldState;
  }
};

export default combineReducers({
  byId: postsById
});
