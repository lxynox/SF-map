import { combineReducers } from 'redux';
import { UPDATE_VEHICLES } from '../constants/ActionTypes';

const ids = (state = {}, action) => {
  if (action.type === UPDATE_VEHICLES) {
    const { vehicles } = action;
    const newState = vehicles.reduce((obj, vehicle) => {
      const { id } = vehicle;
      obj[id] = vehicle;
      return obj;
    }, {});
    return { ...state, ...newState };
  }
  return state;
};

const lastTime = (state = null, action) => {
  if (action.type === UPDATE_VEHICLES) {
    return action.lastTime;
  }
  return state;
}

export default combineReducers({ ids, lastTime });