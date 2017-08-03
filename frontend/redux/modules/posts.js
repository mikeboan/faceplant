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

const syncTypes = [ RECEIVE_POST, UPDATE_POST, REMOVE_POST ];
const syncActions = generateSyncActions(syncTypes, postSchema);

debugger

// async actions
export const postPost = (post, profileUserId) => dispatch => (
  api.postPost(post, profileUserId).then(post => dispatch(receivePost(post)))
);

export const editPost = (post) => dispatch => (
  api.editPost(post).then(post => dispatch(updatePost(post)))
);

export const deletePost = (id) => dispatch => (
  api.deletePost(id).then(post => dispatch(removePost(post)))
);

const api = {
  postPost: (post, profileUserId) => $.ajax({
    url: `/api/profiles/${profileUserId}/posts/`,
    method: 'POST',
    data: { post },
  }),

  editPost: ({id, ...post}) => $.ajax({
    url: `/api/posts/${id}`,
    method: 'PATCH',
    data: { post },
  }),

  deletePost: (id) => $.ajax({
    url: `/api/posts/${id}`,
    method: 'DELETE',
  }),
};

// reducer
const postsById = (oldState = {}, action) => {
  switch(action.type) {
    case UPDATE_POST:
    case RECEIVE_POST:
      // const { user, profileUser, comments, ...post } = action.post;
      // post.profileUserId = profileUser.id;
      return Object.assign({}, oldState, action.entities.posts);

    case REMOVE_POST:
      const newState = Object.assign({}, oldState);
      delete newState[action.post.id];
      return newState;

    case RECEIVE_PROFILE:
      return Object.assign(
        {},
        oldState,
        action.entities.posts
      );

    default:
      return oldState;
  }
};

export default combineReducers({
  byId: postsById
});
