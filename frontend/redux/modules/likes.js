import { combineReducers } from 'redux';

import { RECEIVE_PROFILE } from './profiles';
import { normalize } from './helpers.js';

// action types
export const POST_LIKE = "POST_LIKE";
export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const DELETE_LIKE = "DELETE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

// sync actions
export const receiveLike = like => ({
  type: RECEIVE_LIKE,
  like
});

export const removeLike = like => ({
  type: REMOVE_LIKE,
  like
});

window.removeLike = removeLike;
window.receiveLike = receiveLike;

// async actions
export const postLike = (likeableId, likeableType) => dispatch => (
  api.postLike(likeableId, likeableType).then(like => dispatch(receiveLike(like)))
);

export const deleteLike = (likeId) => dispatch => (
  api.deleteLike(likeId).then(like => dispatch(removeLike(like)))
);


const api = {
  postLike: (likeableId, likeableType) => $.ajax({
    url: `/api/likes`,
    method: 'POST',
    data: {
      like: { likeable_id: likeableId, likeable_type: likeableType }
    }
  }),

  deleteLike: (likeId) => $.ajax({
    url: `/api/likes/id`,
    method: 'DELETE',
  }),
};

window.likesApi = api;

// reducer
const likeById = (oldState = {}, { like }) => (
  Object.assign(
    oldState,
    { [like.id]: like }
  )
);

const likesByType = (oldState = {}, action) => {
  switch(action.type) {
    case RECEIVE_LIKE:
      const type = action.like.likeable_type;
      return Object.assign(
        {},
        oldState,
        { [type]: likeById(oldState[type], action) }
      );

    case REMOVE_LIKE:
      const newState = Object.assign({}, oldState);
      const targetSlice = newState[action.like.likeable_type];
      delete targetSlice[action.like.id];
      return newState;

    case RECEIVE_PROFILE:
      const likes = normalize(action.profile, 'likes');

      return Object.assign(
        {},
        oldState,
        likes
      );

    default:
      return oldState;
  }
};

export default combineReducers({
  byType: likesByType,
});
