import { combineReducers } from 'redux';

import { RECEIVE_PROFILE } from './profiles';

// action types
// export const RECEIVE_PROFILE = "RECEIVE_PROFILE";

// sync actions
// export const receiveProfile = profile => ({
//   type: RECEIVE_PROFILE,
//   profile
// });

// async actions
// export const fetchProfile = (userId) => dispatch => (
//   api.fetchProfile(userId).then(profile => dispatch(receiveProfile(profile)))
// );
// window.fetchProfile = fetchProfile;

// const api = {
//   // fetchProfile: (userId) => $.ajax({
//   //   url: `/api/profiles/${userId}`,
//   //   method: 'GET'
//   // }),
// };

// reducer
const postsById = (oldState = {}, action) => {
  switch(action.type) {
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
