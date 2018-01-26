import React from 'react'
import { bool, node, func } from 'prop-types'
import { connect } from 'react-redux';
import spinnerPng from '../assets/vue.png'

const LoadingIndicator = ({ 
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

LoadingIndicator.defaultProps = {
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

LoadingIndicator.propTypes = {
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

export default connect(stateProps)(LoadingIndicator);
