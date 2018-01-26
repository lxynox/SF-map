import { REQUEST, RECEIVE_SUCCESS, RECEIVE_FAILURE } from '../constants/ActionTypes'

const api = (state = {}, action) => {
  const { type, endpoint, error = '' } = action;
  switch (type) {
    case REQUEST: 
      return { ...state, [endpoint]: { ...state[endpoint], isRequesting: true } };
    case RECEIVE_SUCCESS: 
      return { ...state, [endpoint]: { ...state[endpoint], isRequesting: false} };
    case RECEIVE_FAILURE: {
      return { ...state, [endpoint]: { ...state[endpoint], isRequesting: false, error } };
    }
    default:
  }
  return state;
};

export default api;