import { RECEIVE_PROFILE } from './profiles';

export const LOADING = 'LOADING';

export const load = resourceName => ({
  resourceName,
  type: LOADING
});

// reducer
const loadingReducer = (oldState = false, action) => {
  switch(action.type) {
    case LOADING:
      return true;

    case RECEIVE_PROFILE:
      return false;

    default:
      return oldState;
  }
};

export default loadingReducer;
