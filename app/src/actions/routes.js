import { UPDATE_ROUTES, SELECT_ROUTE, UNSELECT_ROUTE } from '../constants/ActionTypes';
import { ROUTE_API_NAME }  from '../constants/api';
import doFetch from '../utils/doFetch';

// action creators

const updateRoutes = (routes) => ({
  type: UPDATE_ROUTES,
  routes
});

const selectRoute = (route) => ({
   type: SELECT_ROUTE,
   route
});

const unselectRoute = (route) => ({
  type: UNSELECT_ROUTE,
  route
});

// thunks

const fetchRoutes = () =>
  async (dispatch, getState) => {
    const urlParams = { command: 'routeList', a: 'sf-muni' };
    const result = await doFetch(ROUTE_API_NAME, { urlParams });
    if (result) {
      const { route } = result;
      dispatch(updateRoutes(route));
    }
  };

const toggleRoute = (route) =>
  (dispatch, getState) => {
    const { routes: { ids } } = getState()
    const isChecked = !ids[route].isChecked
    if (isChecked) {
      dispatch(selectRoute(route));
    } else {
      dispatch(unselectRoute(route));
    }
  }

export { toggleRoute, fetchRoutes };