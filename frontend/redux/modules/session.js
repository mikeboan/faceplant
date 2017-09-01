import { normalize } from 'normalizr';
import { userSchema } from './schema';

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
    url: '/api/user',
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
  api.signup(user).then(user => dispatch(receiveCurrentUser(user)))
);

// reducer
const defaultState = {
  currentUser: {},
  errors: {}
};

export default (oldState = defaultState, action) => {
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, oldState, { currentUser: action.entities.users[action.result] });
    default:
      return oldState;
  }
};
