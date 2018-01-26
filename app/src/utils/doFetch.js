import resolveUrl from './resolveUrl';
import { request, receiveSuccess, receiveFailure } from '../actions/api';

let store;

/**
 * A customized fetch utility that wraps **fetch API** to inject redux store. So that the request
 * status can be tracked by <RequestTracker/>. (Must be initialized before ui rendering)
 * 
 * An example of showing some customization to improve native fetch, or we can rely on some 3rd party library like axios.
 */

const doFetch = async (endpoint, options = {}) => {
  if (!store)
    throw new Error('Initialize store before using doFetch utility')

  const { dispatch } = store;
  const { urlParams, ...fetchOptions } = options;
  const url = resolveUrl(endpoint, urlParams);

  try {
    dispatch(request(endpoint));
    const response = await fetch(url, fetchOptions)
    const json = await response.json()
    dispatch(receiveSuccess(endpoint));
    return json;
  } catch (err) {
    dispatch(receiveFailure(endpoint, err.message || ''));
  }

  return null;
};

// Init by passing redux store during app initializing phase.

doFetch.init = (reduxStore) => {
  store = reduxStore;
};

export default doFetch;