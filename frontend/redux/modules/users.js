import { combineReducers } from 'redux';

import { RECEIVE_PROFILE } from './profiles';
import { normalize, normalize2 } from './helpers';

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
  // user = { email: 'mike@fake.com', password: 'starwars'}
  fetchUser: (id) => $.ajax({
    url: `/api/users/${id}`,
    method: 'GET'
  }),
};

// reducer
const usersById = (oldState = {}, action) => {
  switch(action.type) {
    case RECEIVE_SINGLE_USER:
      return Object.assign({}, oldState, { [action.user.id]: action.user });

    case RECEIVE_PROFILE:
      // const { user, timeline_post_ids, timeline_posts } = action.profile;
      // const { friends } = user;
      // const newUsers = {};
      // user.friends = Object.keys(friends);
      //
      // timeline_post_ids.map( id => timeline_posts[id]).forEach( post => {
      //   const newUser = post.user;
      //   const newProfileUser = post.profileUser;
      //   // allow friends array to be deleted
      //   newUsers[newUser.id] = newUser;
      //   newUsers[newProfileUser.id] = newProfileUser;
      //
      //   Object.keys(post.comments).forEach( id => {
      //     const comment = post.comments[id];
      //     newUsers[comment.author.id] = comment.author;
      //   });
      // });
      //
      //
      //
      // return Object.assign({}, oldState, newUsers, friends, { [user.id]: user });
      const { user } = action.profile;
      user.friends = Object.keys(user.friends);

      const users = normalize2(action.profile, 'user');
      const friends = normalize(action.profile, 'friends');
      debugger

      return Object.assign({}, oldState, users, friends, { [user.id]: user });


    default:
      return oldState;
  }
};

export default combineReducers({
  byId: usersById
});
