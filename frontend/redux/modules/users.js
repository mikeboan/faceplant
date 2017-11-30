import { combineReducers } from 'redux';
import merge from 'lodash/merge';

import { generateSyncActions } from './shared';
// import { updateCurrentUserFriends } from './helpers';

import { RECEIVE_PROFILE } from './profiles';
import { RECEIVE_POSTS } from './posts';
import { RECEIVE_CURRENT_USER } from './session';
import { RECEIVE_SEARCH_RESULTS } from './search';

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
  })
};

// reducer
const usersById = (oldState = {}, action) => {
  switch(action.type) {
    case RECEIVE_SINGLE_USER:
      return oldState; // TODO?

    case RECEIVE_PROFILE:
    case RECEIVE_POSTS:
    case RECEIVE_CURRENT_USER:
      return merge({}, oldState, action.entities.users);

    case RECEIVE_SEARCH_RESULTS:
      return merge(
        {},
        oldState,
        ...action.results.users.map( user =>
          ({ [user.id]: user })
        )
      );

    default:
      return oldState;
  }
};

export default combineReducers({
  byId: usersById
});




  /////////////////
 // FRIENDSHIPS //
/////////////////

// action types
export const POST_FRIENDSHIP = "POST_FRIENDSHIP";
export const RECEIVE_FRIENDSHIP = "RECEIVE_FRIENDSHIP";
export const UPDATE_FRIENDSHIP = "UPDATE_FRIENDSHIP";
export const REMOVE_FRIENDSHIP = "REMOVE_FRIENDSHIP";

// sync actions
// export const syncActions = generateSyncActions(
//   [ RECEIVE_COMMENT, UPDATE_COMMENT, REMOVE_COMMENT ],
//   commentSchema
// );
export const syncActions = {
  receiveFriendship: (friendship) => ({
    type: RECEIVE_FRIENDSHIP,
    friendship
  }),

  removeFriendship: (friendship) => ({
    type: REMOVE_FRIENDSHIP,
    friendship
  }),
};

// async actions
export const postFriendship = (friendId) => dispatch => (
  friendshipApi.postFriendship(friendId).then(
    friendship => dispatch(syncActions.receiveFriendship(friendship))
  )
);

export const destroyFriendship = (friendId) => dispatch => (
  friendshipApi.destroyFriendship(friendId).then(
    friendship => dispatch(syncActions.removeFriendship(friendship))
  )
);

export const updateFriendship = (friendId, status) => dispatch => (
  friendshipApi.updateFriendship(friendId, status).then(
    friendship => dispatch(syncActions.receiveFriendship(friendship))
  )
);

const friendshipApi = {
  postFriendship: friendeeId => $.ajax({
    url: `/api/users/${friendeeId}/friendships/`,
    method: 'POST',
  }),

  destroyFriendship: friendeeId => $.ajax({
    url: `/api/users/${friendeeId}/friendships/`,
    method: 'DELETE',
  }),

  updateFriendship: (friendeeId, status) => $.ajax({
    url: `/api/users/${friendeeId}/friendships/`,
    method: 'PATCH',
    data: { friendship: { status } },
  })
};
