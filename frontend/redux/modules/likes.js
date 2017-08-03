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
    //   const likes = normalize(action.profile, 'likes');
    //   const byType = {};
    //
    //   Object.keys(likes).forEach( id => {
    //     const like = likes[id];
    //     if (!byType[like.likeable_type]) {
    //       Object.assign(byType, { [like.likeable_type]: {} });
    //     }
    //     Object.assign(byType[like.likeable_type], { [id]: like });
    //   });
    //
    //   return Object.assign({}, oldState, byType);
      // TODO: assign likes to key of likeable_type
      return Object.assign({}, oldState, action.entities.likes);

    default:
      return oldState;
  }
};

export default combineReducers({
  byType: likesByType,
});
