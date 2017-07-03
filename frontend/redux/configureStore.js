import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from './thunk';
import session from './modules/session';
import users from './modules/users';
import profiles from './modules/profiles';
import posts from './modules/posts';

const loggerMiddleware = createLogger(); // initialize logger

const createStoreWithMiddleware = applyMiddleware(thunk, loggerMiddleware)(createStore); // apply logger to redux

const rootReducer = combineReducers({
  session,
  users,
  profiles,
  posts
});

const configureStore = (preloadedState) => createStoreWithMiddleware(rootReducer, preloadedState);
export default configureStore;
