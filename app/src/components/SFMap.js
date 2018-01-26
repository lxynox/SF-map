import React, { Component } from 'react';
import { array, func, object } from 'prop-types';
import { connect } from 'react-redux';

import LoadingIndicator from './LoadingIndicator';
import { VEHICLE_API_NAME } from '../constants';
import * as actionCreators from '../actions/vehicles';

class BaseMap extends Component {

  static propTypes = {
    selectedRoutes: array,
    fetchVehicles: func,
    mapData: object.isRequired,
    pathGenarator: func.isRequired,
    projection: func.isRequired
  }

   // lifecycle hooks

  componentDidMount() {
    const { fetchVehicles } = this.props;
    fetchVehicles();
  }

  // renders

  renderMap() {
    const { mapData, pathGenerator } = this.props;
    return Object.keys(mapData).map((dataName, index) => {
      const { features } = mapData[dataName];
      const colors = ["#57c7ff", "#ff6ac1", "#5af78e", "#ff5c57"];
      return (
        <g fill="#282a36">
          {features.map((feature, index) => (
            <path key={`path-${index}`} d={pathGenerator(feature)} fill={colors[index]} stroke="#cccccc" />
          ))}
        </g>
      );
    })
  }

  renderVehicles() {
    const { visibleVehicles, projection } = this.props;
    return (
      <g className="">
        {visibleVehicles.map(({ lon, lat, color }, index) => (
          <circle
            key={`circle-${index}`}
            cx={projection([lon, lat])[0]}
            cy={projection([lon, lat])[1]}
            r={10}
            fill={color}
            stroke="#FFFFFF"
            className="marker"
          />
        ))}
      </g>
    );
  }

  render() {
    return (
      <LoadingIndicator endpoint={VEHICLE_API_NAME}>
        <svg width="800" height="800" viewBox="0 0 800 800">
          {this.renderMap()}
          {this.renderVehicles()}
        </svg>
      </LoadingIndicator>
    );
  }
}

// redux bindings

const stateProps = (state) => {
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

  return {
    visibleVehicles
  };
};

export default connect(stateProps, actionCreators)(BaseMap);
