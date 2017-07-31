import { combineReducers } from 'redux';

import { RECEIVE_PROFILE } from './profiles';
import { RECEIVE_COMMENT } from './comments';

// action types
export const POST_POST = "POST_POST";
export const RECEIVE_POST = "RECEIVE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const REMOVE_POST = "REMOVE_POST";

// sync actions
export const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

export const updatePost = post => ({
  type: UPDATE_POST,
  post
});

export const removePost = post => ({
  type: REMOVE_POST,
  post
});

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
      const { user, profileUser, comments, ...post } = action.post;
      post.profileUserId = profileUser.id;
      return Object.assign({}, oldState, { [post.id]: post });

    case REMOVE_POST:
      const newState = Object.assign({}, oldState);
      delete newState[action.post.id];
      return newState;

    case RECEIVE_PROFILE:
      const { timeline_posts, timeline_post_ids } = action.profile;
      const newPosts = timeline_post_ids.map( id => {
        const { user, comments, ...post } = timeline_posts[id];
        return { [post.id]: post };
      });

      return Object.assign(
        {},
        oldState,
        ...newPosts
      );

    // case RECEIVE_COMMENT:
    //   const { comment } = action;
    //   const commentedPost = oldState[comment.commentable_id];
    //   commentedPost.timeline_post_ids = [comment.id, ...commentedPost.timeline_post_ids];
    //   return Object.assign({}, { [commentedPost.id]: commentedPost });


    default:
      return oldState;
  }
};

export default combineReducers({
  byId: postsById
});
