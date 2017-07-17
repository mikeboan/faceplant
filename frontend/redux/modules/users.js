import { combineReducers } from 'redux';
import { RECEIVE_PROFILE } from './profiles';

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
      const { user, timeline_posts } = action.profile;
      const newUsers = { [user.id]: user };
      const timelinePosts = Object.keys(timeline_posts).map( id => timeline_posts[id]);
      timelinePosts.forEach( post => {
        const newUser = post.user;
        const newProfileUser = post.profileUser;
        newUsers[newUser.id] = newUser;
        newUsers[newProfileUser.id] = newProfileUser;
      });
      return Object.assign({}, oldState, newUsers);

    default:
      return oldState;
  }
};

export default combineReducers({
  byId: usersById
});
