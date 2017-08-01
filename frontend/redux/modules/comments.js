import { combineReducers } from 'redux';
import { normalize } from 'normalizr';

import { RECEIVE_PROFILE } from './profiles';
import { comment } from './schema';

// action types
export const POST_COMMENT = "POST_COMMENT";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

// sync actions
export const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
});

export const updateComment = comment => ({
  type: UPDATE_COMMENT,
  comment
});

export const removeComment = comment => ({
  type: REMOVE_COMMENT,
  comment
});

// async actions
export const postComment = (comment, postId) => dispatch => (
  api.postComment(comment, postId).then(comment => dispatch(receiveComment(comment)))
);

const api = {
  postComment: (comment, postId) => $.ajax({
    url: `/api/posts/${postId}/comments/`,
    method: 'POST',
    data: { comment },
  }),
};

// reducer
const commentsById = (oldState = {}, action) => {
  switch(action.type) {

    case RECEIVE_COMMENT:
      return Object.assign({}, oldState, { [action.comment.id]: action.comment });

    case RECEIVE_PROFILE:
      // const { timeline_posts, timeline_post_ids } = action.profile;
      // const newComments = Object.assign({}, oldState);
      //
      // timeline_post_ids.forEach( id => {
      //   const { user, comments, ...post } = timeline_posts[id];
      //   Object.keys(comments).forEach( (commentId) => {
      //     const comment = comments[commentId];
      //     const likers = comment.likers || {};
      //     comment.likers = Object.keys(likers);
      //     Object.assign(newComments, { [comment.id]: comment });
      //   });
      // });

      // return newComments;
      return Object.assign({}, oldState, action.entities.comments);

    default:
      return oldState;
  }
};

export default combineReducers({
  byId: commentsById
});
