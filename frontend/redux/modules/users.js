import { combineReducers } from 'redux';
import { RECEIVE_PROFILE } from './profiles';

// action types
export const RECEIVE_SINGLE_USER = "RECEIVE_SINGLE_USER";

// sync actions
export const receiveUser = user => ({
  type: RECEIVE_SINGLE_USER,
  user
});

// async actions
export const fetchUser = (id) => dispatch => (
  api.fetchUser(id).then(user => dispatch(receiveUser(user)))
);

const api = {
  // user = { email: 'mike@fake.com', password: 'starwars'}
  fetchUser: (id) => $.ajax({
    url: `/api/users/${id}`,
    method: 'GET'
  }),
};


// reducer
const usersById = (oldState = {}, action) => {
  switch(action.type) {
    case RECEIVE_SINGLE_USER:
      return Object.assign({}, oldState, { [action.user.id]: action.user });

    case RECEIVE_PROFILE:
      const { user } = action.profile;
      return Object.assign({}, oldState, { [user.id]: user });

    default:
      return oldState;
  }
};

export default combineReducers({
  byId: usersById
});
