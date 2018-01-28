import React, { Component } from 'react';
import { array, func, object } from 'prop-types';
import { connect } from 'react-redux';

import RequestTracker from './RequestTracker';
import { VEHICLE_API_NAME } from '../constants/api';
import * as actionCreators from '../actions/vehicles';
import { getVisibleVehicles } from '../store/selectors';

class SFMap extends Component {

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
      <g>
        {visibleVehicles.map(({ lon, lat, color }, index) => (
          <circle
            key={`circle-${index}`}
            cx={projection([lon, lat])[0]}
            cy={projection([lon, lat])[1]}
            r={10}
            fill={color}
            stroke="#FFFFFF"
          />
        ))}
      </g>
    );
  }

  render() {
    return (
      <div style={{
        flex: 3,
        width: '100vw',
        padding: '2rem 2rem'
      }}>
        <RequestTracker endpoint={VEHICLE_API_NAME}>
          <svg width="80%" height="80%" viewBox="0 0 800 800">
            {this.renderMap()}
            {this.renderVehicles()}
          </svg>
        </RequestTracker>
      </div>
    );
  }
}

// redux bindings

const stateProps = (state) => {
  return {
    visibleVehicles: getVisibleVehicles(state)
  };
};

export default connect(stateProps, actionCreators)(SFMap);
