import { combineReducers } from 'redux';
import { UPDATE_ROUTES, SELECT_ROUTE, UNSELECT_ROUTE } from "../constants/ActionTypes";
import { getRandomColor } from '../utils/color';

const ids = (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case UPDATE_ROUTES: {
      const { routes } = action;
      const routesObj = routes.reduce((obj, route) => {
        const { tag } = route;
        obj[tag] = { ...route, color: getRandomColor() };
        return obj;
      }, {});
      return { ...state, ...routesObj };
    }
    default:
  }
  return state;
};

const selectedRoutes = (state = [], action) => {
  switch (action.type) {
    case SELECT_ROUTE: {
      const { route: tag } = action;
      return [ ...state, tag ];
    }
    case UNSELECT_ROUTE: {
      const { route: tag } = action;
      return state.filter(id => id !== tag);
    }
    default:
  }
  return state;
}

export default combineReducers({ ids, selectedRoutes });