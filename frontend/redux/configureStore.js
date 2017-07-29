import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from './thunk';
import session from './modules/session';
import users from './modules/users';
import profiles from './modules/profiles';
import posts from './modules/posts';
import comments from './modules/comments';
import likes from './modules/likes';
import modal from './modules/modal';

const loggerMiddleware = createLogger(); // initialize logger
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk, loggerMiddleware))(createStore); // apply logger to redux

const rootReducer = combineReducers({
  session,
  users,
  profiles,
  posts,
  comments,
  likes,
  modal
});

const configureStore = (preloadedState) => createStoreWithMiddleware(rootReducer, preloadedState);

export default configureStore;
