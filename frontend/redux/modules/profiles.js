import { combineReducers } from 'redux';
import { RECEIVE_POST, REMOVE_POST } from './posts';

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

// helpers
const updateTimelinePosts = (oldState = [], action) => {
  const profileUserId = Object.keys(oldState).find( userId => {
    return oldState[userId].id === action.post.profile_id;
  });
  const updatedProfile = Object.assign(
    {},
    oldState[profileUserId]
  );
  debugger
  switch(action.type) {
    case RECEIVE_POST:
      updatedProfile.timelinePosts = [action.post.id, ...updatedProfile.timelinePosts];
      break;

    case REMOVE_POST:
      updatedProfile.timelinePosts = updatedProfile.timelinePosts.filter( (postId) => {
        return postId !== action.post.id;
      });
      break;

    default:
      return oldState;
  }

  return Object.assign(
    {},
    oldState,
    { [updatedProfile.user_id]: updatedProfile }
  );
};

// profile reducer
const profilesByUserId = (oldState = {}, action) => {
  switch(action.type) {
    case RECEIVE_PROFILE:
      const { user, timeline_posts, timeline_post_ids, ...profile } = action.profile;
      profile.timelinePosts = timeline_post_ids;
      return Object.assign(
        {},
        oldState,
        { [action.profile.user_id]: profile }
      );

    case RECEIVE_POST:
    case REMOVE_POST:
      return updateTimelinePosts(oldState, action);

    default:
      return oldState;
  }
};

export default combineReducers({
  byUserId: profilesByUserId
});
