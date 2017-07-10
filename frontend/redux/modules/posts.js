import { combineReducers } from 'redux';

import { RECEIVE_PROFILE } from './profiles';

// action types
export const POST_POST = "POST_POST";
export const RECEIVE_POST = "RECEIVE_POST";

// sync actions
export const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

// async actions
export const postPost = (post, profileUserId) => dispatch => (
  api.postPost(post, profileUserId).then(post => dispatch(receivePost(post)))
);
// window.fetchProfile = fetchProfile;

const api = {
  postPost: (post, profileUserId) => $.ajax({
    url: `/api/profiles/${profileUserId}/posts/`,
    method: 'POST',
    data: { post }
  }),
};

// reducer
const postsById = (oldState = {}, action) => {
  switch(action.type) {
    case RECEIVE_POST:
      const { user, ...post } = action.post;
      return Object.assign({}, oldState, { [post.id]: post });

    case RECEIVE_PROFILE:
      const { timeline_posts } = action.profile;
      const newPosts = Object.keys(timeline_posts).map( id => {
        const { user, ...post } = timeline_posts[id];
        return { [post.id]: post };
      });

      return Object.assign(
        {},
        oldState,
        ...newPosts
      );

    default:
      return oldState;
  }
};

export default combineReducers({
  byId: postsById
});
