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
      return Object.assign(
        {},
        oldState,
        timeline_posts
      );

    default:
      return oldState;
  }
};

export default combineReducers({
  byId: postsById
});
