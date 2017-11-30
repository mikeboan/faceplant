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
    .fail(console.log)
);

export const receiveSearchResults = (results) => {
  const normalizedResults = normalize(results, searchSchema);
  delete normalizedResults.search;
  return {
    type: RECEIVE_SEARCH_RESULTS,
    results
  };
};

window.searchUsers = searchUsers;

export default function (state = {}, action) {
  switch (action.type) {

    case RECEIVE_SEARCH_RESULTS:
      const newState = Object.assign({}, action.results);
      Object.keys(newState).forEach( result => {
        newState[result] = newState[result].map( item => item.id)
      });
      return newState;

    default:
      return state;
  }
}
