import { VEHICLE_API_NAME } from '../constants';
import { UPDATE_VEHICLES } from '../constants/ActionTypes';
import { doFetch } from '../utils';

let fetchVehiclesTimer;
const FETCH_INTERVAL = 15 * 1000;

// Action creators

const updateVehicles = (lastTime, vehicles) => ({
  type: UPDATE_VEHICLES,
  vehicles,
  lastTime
});

// Thunks

const onUnmount = () =>
  (dispatch, getState) => {
    clearTimeout(fetchVehiclesTimer);
  };

const fetchVehicles = () =>
  async (dispatch, getState) => {
    const { vehicles: { lastTime: t } } = getState();
    const urlParams = { command: 'vehicleLocations', a: 'sf-muni', t};
    const result = await doFetch(VEHICLE_API_NAME, { urlParams });

    if (result) {
      const { lastTime, vehicle } = result;
      dispatch(updateVehicles(lastTime, vehicle));
    }

    fetchVehiclesTimer = setTimeout(() => dispatch(fetchVehicles()), FETCH_INTERVAL);
  };

export { fetchVehicles, onUnmount };