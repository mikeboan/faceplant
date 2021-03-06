import { normalize } from 'normalizr';
import { searchSchema } from './schema';

export const SEARCH_USERS = "SEARCH_USERS";
export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS";
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";

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

export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
});

const _defaultState = {
  users: [],
}

export default function (state = _defaultState, action) {
  switch (action.type) {

    case RECEIVE_SEARCH_RESULTS:
      const newState = Object.assign({}, state, action.results);
      Object.keys(newState).forEach( result => {
        newState[result] = newState[result].map( item => item.id)
      });
      return newState;

    case CLEAR_SEARCH_RESULTS:
    default:
      return _defaultState;
  }
}
