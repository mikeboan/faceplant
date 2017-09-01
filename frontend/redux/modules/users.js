import { combineReducers } from 'redux';

import { RECEIVE_PROFILE } from './profiles';
import { RECEIVE_CURRENT_USER } from './session';

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
  fetchUser: (id) => $.ajax({
    url: `/api/users/${id}`,
    method: 'GET'
  }),
};

// reducer
const usersById = (oldState = {}, action) => {
  switch(action.type) {
    case RECEIVE_SINGLE_USER:
      return oldState; // TODO

    case RECEIVE_PROFILE:
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, oldState, action.entities.users);

    default:
      return oldState;
  }
};

export default combineReducers({
  byId: usersById
});
