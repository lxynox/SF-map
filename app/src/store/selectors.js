/**
 * A few selectors to compute UI props from redux state
 */

const getVisibleVehicles = (state) => {
  const {
    routes: {
      ids: routes,
      selectedRoutes: selectedRouteIds
    },
    vehicles: {
      ids: vehicles
    }
  } = state;

  const routeVehiclesMap = Object.keys(vehicles).reduce((obj, id) => {
    const { routeTag: tag } = vehicles[id];
    if (!obj.hasOwnProperty(tag)) obj[tag] = [];
    obj[tag].push(id);
    return obj;
  }, {});

  const visibleVehicles = [];
  selectedRouteIds.forEach(id => {
    const { color } = routes[id];
    const vehicleIds = routeVehiclesMap[id];
    const vehiclesWithColor = vehicleIds.map(id => ({ ...vehicles[id], color }));
    if (Array.isArray(vehicleIds)) visibleVehicles.push(...vehiclesWithColor);
  });

  return visibleVehicles;
}

const getRoutes = (state) => {
  const { 
    routes: {
      ids,
      selectedRoutes
    }
  } = state;

  return Object.keys(ids).map(id => {
    const route = ids[id];
    if (selectedRoutes.indexOf(id) !== -1) {
      route.isChecked = true;
    } else {
      route.isChecked = false;
    }
    return route;
  });
}

export { getVisibleVehicles, getRoutes };