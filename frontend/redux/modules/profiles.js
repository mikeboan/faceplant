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
window.fetchProfile = fetchProfile;

const api = {
  // user = { email: 'mike@fake.com', password: 'starwars'}
  fetchProfile: (userId) => $.ajax({
    url: `/api/profiles/${userId}`,
    method: 'GET'
  }),
};

// reducer
const profilesByUserId = (oldState = {}, action) => {
  switch(action.type) {
    case RECEIVE_PROFILE:
      const {user, ...profile} = action.profile;
      return Object.assign({}, oldState, { [action.profile.user.id]: action.profile });

    default:
      return oldState;
  }
};

export default combineReducers({
  byUserId: profilesByUserId
});
