import { REQUEST, RECEIVE_SUCCESS, RECEIVE_FAILURE } from '../constants/ActionTypes';

const request = (endpoint) => ({
  type: REQUEST,
  endpoint
});

const receiveSuccess = (endpoint) => ({
  type: RECEIVE_SUCCESS,
  endpoint
});

const receiveFailure = (endpoint, error) => ({
  type: RECEIVE_FAILURE,
  endpoint,
  error
});


export { request, receiveSuccess, receiveFailure };