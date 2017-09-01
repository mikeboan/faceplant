import { combineReducers } from 'redux';
import { RECEIVE_POST, REMOVE_POST } from './posts';
import { normalize } from 'normalizr';

import { profileSchema } from './schema';
import { generateSyncActions } from './shared';

import { load } from './loading';

// action types
export const RECEIVE_PROFILE = "RECEIVE_PROFILE";

// sync actions
const syncActions = generateSyncActions(
  [ RECEIVE_PROFILE ],
  profileSchema
);

// async actions
export const fetchProfile = (userId) => dispatch => {
  dispatch(load('profile'));
  return api.fetchProfile(userId).then(profile =>
    dispatch(syncActions.receiveProfile(profile)));
};

const api = {
  fetchProfile: (userId) => $.ajax({
    url: `/api/profiles/${userId}`,
    method: 'GET'
  }),
};

// profile reducer
const profilesByUserId = (oldState = {}, action) => {
  const newState = Object.assign({}, oldState);

  switch(action.type) {
    case RECEIVE_PROFILE:
      return Object.assign({}, oldState, action.entities.profiles);

    case RECEIVE_POST:
      const { posts } = action.entities;
      // add post ids to appropriate profile timelines
      Object.keys(posts).forEach(postId => {
        const post = posts[postId];
        const profile = newState[post.profileUserId];
        profile.timelinePosts = [postId, ...profile.timelinePosts];
      });
      return newState;

    case REMOVE_POST:
      Object.keys(action.entities.posts).map( id => action.entities.posts[id] )
        .forEach( post => {
          const profile = newState[post.profileUserId];
          profile.timelinePosts = profile.timelinePosts.filter((postId) => (
            parseInt(postId) !== action.result
          ));
        }
      );
      return newState;

    default:
      return oldState;
  }
};

export default combineReducers({
  byUserId: profilesByUserId
});
