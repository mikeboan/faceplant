import { combineReducers } from 'redux';
import { RECEIVE_POST, REMOVE_POST } from './posts';
import { normalize } from 'normalizr';

import { profileSchema } from './schema';
import { generateSyncActions } from './shared';

// action types
export const RECEIVE_PROFILE = "RECEIVE_PROFILE";

// sync actions
const syncActions = generateSyncActions(
  [ RECEIVE_PROFILE ],
  profileSchema
);

// async actions
export const fetchProfile = (userId) => dispatch => (
  api.fetchProfile(userId).then(profile =>
    dispatch(syncActions.receiveProfile(profile)))
);

const api = {
  fetchProfile: (userId) => $.ajax({
    url: `/api/profiles/${userId}`,
    method: 'GET'
  }),
};

window.profileApi = api;
window.profileActions = syncActions;

// profile reducer
const profilesByUserId = (oldState = {}, action) => {
  switch(action.type) {
    case RECEIVE_PROFILE:
      return Object.assign({}, oldState, action.entities.profiles);

    case RECEIVE_POST:
      const { posts } = action.entities;
      const newState = Object.assign({}, oldState);
      // add post ids to appropriate profile timelines
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
