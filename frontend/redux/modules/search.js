import { normalize } from 'normalizr';
import { searchSchema } from './schema';

export const SEARCH_USERS = "SEARCH_USERS";
export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS";

const api = {
  searchUsers: (query) => $.ajax({
    url: `/api/users?query=${query}`,
    method: 'GET'
  })
};

export const searchUsers = (query) => (dispatch) => (
  api.searchUsers(query)
    .then(results => dispatch(receiveSearchResults(results)))
    // .error(console.log)
);

export const receiveSearchResults = (results) => {
  const normalizedResults = normalize(results, searchSchema);
};

window.searchUsers = searchUsers;

export default function (state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}
