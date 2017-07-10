import { combineReducers } from 'redux';
import { RECEIVE_POST } from './posts';

// action types
export const RECEIVE_PROFILE = "RECEIVE_PROFILE";

// sync actions
export const receiveProfile = profile => ({
  type: RECEIVE_PROFILE,
  profile
});

// async actions
export const fetchProfile = (userId) => dispatch => (
  api.fetchProfile(userId).then(profile => dispatch(receiveProfile(profile)))
);

const api = {
  fetchProfile: (userId) => $.ajax({
    url: `/api/profiles/${userId}`,
    method: 'GET'
  }),
};

// reducer
const profilesByUserId = (oldState = {}, action) => {
  switch(action.type) {
    case RECEIVE_PROFILE:
      const {user, timeline_posts, ...profile} = action.profile;
      profile.timelinePosts = Object.keys(timeline_posts);
      return Object.assign(
        {},
        oldState,
        { [action.profile.user_id]: profile }
      );

    case RECEIVE_POST:
      const profileUserId = Object.keys(oldState).find( userId => {
        return oldState[userId].id === action.post.profile_id;
      });
      const updatedProfile = Object.assign(
        {},
        oldState[profileUserId]
      );
      updatedProfile.timelinePosts = [action.post.id, ...updatedProfile.timelinePosts];
      debugger
      return Object.assign(
        {},
        oldState,
        { [updatedProfile.user_id]: updatedProfile }
      );

    default:
      return oldState;
  }
};

export default combineReducers({
  byUserId: profilesByUserId
});
