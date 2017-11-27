import { normalize } from 'normalizr';
import { userSchema } from './schema';

import {
  RECEIVE_AUTH_ERRORS,
  CLEAR_AUTH_ERRORS,
  receiveAuthErrors,
  clearAuthErrors
} from './errors';

import {
  RECEIVE_FRIENDSHIP,
  UPDATE_FRIENDSHIP,
  REMOVE_FRIENDSHIP
} from './users';

const api = {
  login: (user) => $.ajax({
    url: '/api/session',
    method: 'POST',
    data: { user }
  }),

  logout: () => $.ajax({
    url: '/api/session',
    method: 'DELETE'
  }),

  signup: (user) => $.ajax({
    url: '/api/users',
    method: 'POST',
    data: { user }
  }),
};

// action types
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

// sync actions
export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  ...normalize(user, userSchema)
});

// async actions
export const login = user => dispatch => (
  api.login(user).then(user => dispatch(receiveCurrentUser(user)))
);

export const logout = () => dispatch => (
  api.logout().then(user => dispatch(receiveCurrentUser({})))
);

export const signup = (user) => dispatch => (
  api.signup(user)
    .then(user => dispatch(receiveCurrentUser(user)))
    .then(() => dispatch(clearAuthErrors()))
    .fail(res => dispatch(receiveAuthErrors(res.responseJSON)))
);

// reducer
const defaultState = {
  currentUser: {},
  errors: {}
};

const updateCurrentUserFriends = (currentUser, friendship) => {
  const friendId = friendship.friendee_id === currentUser.id ?
    friendship.friender_id :
    friendship.friendee_id;

  [
    'acceptedFriends',
    'outPendingFriends',
    'inPendingFriends',
    'rejectedFriends'
  ].forEach( key =>
    currentUser[key] = currentUser[key].filter( id => id !== friendId )
  );

  let friends;
  switch(friendship.status) {
    case 'accepted':
      friends = 'acceptedFriends';
      break;
    case 'pending':
      friends = 'outPendingFriends';
      break;
    case 'rejected':
      friends = 'rejectedFriends';
      break;
  }

  currentUser[friends] = [friendId, ...currentUser[friends]];
};

export default (oldState = defaultState, action) => {
  let newState;
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign(
        {},
        oldState,
        { currentUser: action.entities.users[action.result] }
      );

    case RECEIVE_FRIENDSHIP:
      newState = Object.assign({}, oldState);
      updateCurrentUserFriends(oldState.currentUser, action.friendship);
      return Object.assign({}, oldState);

    case REMOVE_FRIENDSHIP:
      newState = Object.assign({}, oldState);

      const { friendship } = action;
      const friendId = friendship.friendee_id === newState.currentUser.id ?
        friendship.friender_id :
        friendship.friendee_id;
      newState.currentUser.acceptedFriends =
        newState.currentUser.acceptedFriends.filter( id => id !== friendId );
      return newState;

    default:
      return oldState;
  }
};
