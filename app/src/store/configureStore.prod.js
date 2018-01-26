import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const middlewares = applyMiddleware(thunk);

const configureStore = (initialState) => {
  return createStore(rootReducer, initialState, middlewares);
};

export default configureStore;