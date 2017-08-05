import { combineReducers } from 'redux';

import { RECEIVE_PROFILE } from './profiles';
import { likeSchema } from './schema';
import { generateSyncActions } from './shared.js';


// action types
export const POST_LIKE = "POST_LIKE";
export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const DELETE_LIKE = "DELETE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

// sync actions
// export const receiveLike = like => ({
//   type: RECEIVE_LIKE,
//   like
// });
//
// export const removeLike = like => ({
//   type: REMOVE_LIKE,
//   like
// });

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

  deleteLike: (likeable_id, likeable_type) => $.ajax({
    url: `/api/likes/id`,
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

  switch(action.type) {
    case RECEIVE_PROFILE:
    case RECEIVE_LIKE:
      const newState = Object.assign({}, oldState);
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

      return oldState;

    default:
      return oldState;
  }
};

export default combineReducers({
  byType: likesByType,
});
