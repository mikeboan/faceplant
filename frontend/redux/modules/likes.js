import { combineReducers } from 'redux';

import { RECEIVE_PROFILE } from './profiles';
import { likeSchema } from './schema';
import { generateSyncActions } from './shared.js';


// action types
export const POST_LIKE = "POST_LIKE";
export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const DELETE_LIKE = "DELETE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

export const syncActions = generateSyncActions(
  [ RECEIVE_LIKE, REMOVE_LIKE ],
  likeSchema
);


// async actions
export const postLike = (likeableId, likeableType) => dispatch => (
  api.postLike(likeableId, likeableType).then(
    like => dispatch(syncActions.receiveLike(like))
  )
);

export const deleteLike = (likeableId, likeableType) => dispatch => (
  api.deleteLike(likeableId, likeableType).then(
    like => dispatch(syncActions.removeLike(like))
  )
);


const api = {
  postLike: (likeable_id, likeable_type) => $.ajax({
    url: `/api/likes`,
    method: 'POST',
    data: {
      like: { likeable_id, likeable_type }
    }
  }),

  deleteLike: (likeableId, likeableType) => $.ajax({
    url: `/api/${likeableType.toLowerCase()}s/${likeableId}/likes`,
    method: 'DELETE',
  }),
};


// reducer
const likeById = (oldState = {}, like) => (
  Object.assign(
    oldState,
    { [like.id]: like }
  )
);

const likesByType = (oldState = {}, action) => {
  const newState = Object.assign({}, oldState);

  switch(action.type) {
    case RECEIVE_PROFILE:
    case RECEIVE_LIKE:
      const { likes } = action.entities;
      Object.keys(likes).forEach( id => {
        const like = likes[id];
        const type = like.likeable_type;
        Object.assign(
          newState,
          { [type]: likeById(oldState[type], like) }
        );
      });
      return newState;

    case REMOVE_LIKE:
      const oldLike = action.entities.likes[action.result];
      delete newState[oldLike.likeable_type][oldLike.id];
      return newState;

    default:
      return oldState;
  }
};

export default combineReducers({
  byType: likesByType,
});
