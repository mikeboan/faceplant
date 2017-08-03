import { combineReducers } from 'redux';
import { RECEIVE_POST, REMOVE_POST } from './posts';
import { normalize } from 'normalizr';

import { profileSchema } from './schema';
import { generateSyncActions } from './shared';

// action types
export const RECEIVE_PROFILE = "RECEIVE_PROFILE";

// sync actions
// const syncActions = generateSyncActions(
//   [ RECEIVE_PROFILE ],
//   profileSchema
// );

export const receiveProfile = profile => ({
  type: RECEIVE_PROFILE,
  ...normalize(profile, profileSchema)
});

// async actions
export const fetchProfile = (userId) => dispatch => (
  api.fetchProfile(userId).then(profile =>
    dispatch(receiveProfile(profile)))
);

const api = {
  fetchProfile: (userId) => $.ajax({
    url: `/api/profiles/${userId}`,
    method: 'GET'
  }),
};

// profile reducer
const profilesByUserId = (oldState = {}, action) => {
  switch(action.type) {
    case RECEIVE_PROFILE:
      const { profiles } = action.entities;
      const newProfiles = Object.keys(profiles).map(id => {
        const profile = profiles[id];
        return { [profile.user_id]: profile };
      });
      return Object.assign({}, oldState, ...newProfiles);

    case RECEIVE_POST:
      const { posts } = action.entities;
      const newState = Object.assign({}, oldState);
      Object.keys(posts).forEach(postId => {
        const post = posts[postId];
        const profile = newState[post.profileUserId];
        profile.timelinePosts = [postId, ...profile.timelinePosts];
      });
      return newState;

    default:
      return oldState;
  }
};

export default combineReducers({
  byUserId: profilesByUserId
});
