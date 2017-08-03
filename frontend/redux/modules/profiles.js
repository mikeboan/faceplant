import { combineReducers } from 'redux';
import { RECEIVE_POST, REMOVE_POST } from './posts';
import { normalize } from 'normalizr';

import { profileSchema } from './schema';

// action types
export const RECEIVE_PROFILE = "RECEIVE_PROFILE";

// sync actions
export const receiveProfile = profile => {debugger; return({
  type: RECEIVE_PROFILE,
  ...normalize(profile, profileSchema)
})};

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

    // case RECEIVE_POST:
    // case REMOVE_POST:
    //   const newProfiles = [];
    //   const posts = Object.keys(action.entities.posts)
    //     .map(id => action.entities.posts[id])
    //     .forEach(post => {
    //
    //     });
    //   return Object.assign({}, oldState, ...newProfiles);

    default:
      return oldState;
  }
};

export default combineReducers({
  byUserId: profilesByUserId
});
