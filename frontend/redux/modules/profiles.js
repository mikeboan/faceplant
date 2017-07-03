import { combineReducers } from 'redux';

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
      profile.timelinePosts = Object.keys(timeline_posts).map(id => id);

      return Object.assign(
        {},
        oldState,
        { [action.profile.user_id]: profile }
      );

    default:
      return oldState;
  }
};

export default combineReducers({
  byUserId: profilesByUserId
});
