import { combineReducers } from 'redux';

// action types
export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";

// sync actions
export const showModal = component => ({
  type: SHOW_MODAL,
  component
});

export const hideModal = () => ({
  type: HIDE_MODAL
});

// reducer
const modalReducer = (oldState = { content: null }, action) => {
  switch(action.type) {
    case SHOW_MODAL:
      return { component: action.component };

    case HIDE_MODAL:
      return { component: null };

    default:
      return oldState;
  }
};

export default modalReducer;
