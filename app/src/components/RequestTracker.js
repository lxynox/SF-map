import React from 'react'
import { bool, node, func } from 'prop-types'
import { connect } from 'react-redux';
import spinnerPng from '../assets/vue.png'

/**
 * Wrapper component component in track of *in-flight* API request.
 * 
 *   When API request on flight - display Spinner
 *   When API request fails - display Error
 *   When API request resovles with 200 - display children it wraps
 */

const RequestTracker = ({ 
  isRequesting, 
  isRequestFailed,
  children,
  Spinner,
  Failure,
   ...rest 
}) => {
  if (isRequesting) {
    return <Spinner />;
  } else if (isRequestFailed) {
    return <Failure {...rest} />
  }
  return children;
};

RequestTracker.defaultProps = {
  Spinner: (props) => (
    <img src={spinnerPng} alt='loading...' style={{ 
      position: 'absolute', 
      top: '50%', 
      left: '50%',
      animation: 'spinner-spin infinite 5s linear',
      marginTop: -40,
      marginLeft: -40,
      height: 80
    }} />
  ),
  Failure: (props) => <h1 {...props}>Network failed!</h1>,
};

RequestTracker.propTypes = {
  isRequesting: bool,
  isRequestFailed: bool,
  children: node,
  Spinner: func,
  Failure: func
};

// redux bindings

const stateProps = (state, ownProps) => {
  return {
    isRequesting: (state.api[ownProps.endpoint] || {}).isRequesting,
    isRequestFailed: !!(state.api[ownProps.endpoint] || {}).error
  };
};

export default connect(stateProps)(RequestTracker);
