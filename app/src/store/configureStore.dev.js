import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger();
const middlewares = applyMiddleware(thunk, logger);

const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState, middlewares);
  window.__store__ = store;

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
};

export default configureStore;