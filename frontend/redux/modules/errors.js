import { combineReducers } from 'redux';

export const RECEIVE_AUTH_ERRORS = "RECEIVE_AUTH_ERRORS";
export const RECEIVE_POST_ERRORS = "RECEIVE_POST_ERRORS";
export const RECEIVE_COMMENT_ERRORS = "RECEIVE_COMMENT_ERRORS";
export const CLEAR_AUTH_ERRORS = "CLEAR_AUTH_ERRORS";
export const CLEAR_POST_ERRORS = "CLEAR_POST_ERRORS";
export const CLEAR_COMMENT_ERRORS = "CLEAR_COMMENT_ERRORS";
export const CLEAR_ALL_ERRORS = "CLEAR_ALL_ERRORS";
export const CLEAR_SINGLE_AUTH_ERROR = "CLEAR_SINGLE_AUTH_ERROR";

const _defaultState = {};

export const receiveAuthErrors = (errors) => ({
  errors,
  type: RECEIVE_AUTH_ERRORS
});

export const receivePostErrors = (errors) => ({
  errors,
  type: RECEIVE_POST_ERRORS
});

export const receiveCommentErrors = (errors) => ({
  errors,
  type: RECEIVE_AUTH_ERRORS
});

export const clearSingleAuthError = fieldName => ({
  fieldName,
  type: CLEAR_SINGLE_AUTH_ERROR
})

export const clearAllErrors = () => ({ type: CLEAR_ALL_ERRORS });
export const clearAuthErrors = () => ({ type: CLEAR_AUTH_ERRORS });
export const clearPostErrors = () => ({ type: CLEAR_POST_ERRORS });
export const clearCommentErrors = () => ({ type: CLEAR_AUTH_ERRORS });

const auth = (state = _defaultState, action) => {
  switch (action.type) {
    case RECEIVE_AUTH_ERRORS:
      return Object.assign({}, state, action.errors);
    case CLEAR_SINGLE_AUTH_ERROR:
      const newState = Object.assign({}, state);
      delete newState[action.fieldName];
      return newState;
    case CLEAR_AUTH_ERRORS:
    case CLEAR_ALL_ERRORS:
      return _defaultState;
    default:
      return state;
  }
};

const posts = (state = _defaultState, action) => {
  switch (action.type) {
    case RECEIVE_POST_ERRORS:
      return Object.assign({}, state, action.errors);
    case CLEAR_POST_ERRORS:
    case CLEAR_ALL_ERRORS:
      return _defaultState;
    default:
      return state;
  }
};

const comments = (state = _defaultState, action) => {
  switch (action.type) {
    case RECEIVE_COMMENT_ERRORS:
      return Object.assign({}, state, action.errors);
    case CLEAR_COMMENT_ERRORS:
    case CLEAR_ALL_ERRORS:
      return _defaultState;
    default:
      return state;
  }
};

export default combineReducers({ auth, posts, comments });
