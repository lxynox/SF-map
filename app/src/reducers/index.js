import { combineReducers } from 'redux';

import api from './api';
import routes from './routes';
import vehicles from './vehicles';

const rootReducer = combineReducers({
  api,
  vehicles,
  routes
});

export default rootReducer;
