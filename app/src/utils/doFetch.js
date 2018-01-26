import resolveUrl from './resolveUrl';
import { request, receiveSuccess, receiveFailure } from '../actions/api';

let store;

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

doFetch.init = (reduxStore) => {
  store = reduxStore;
};

export default doFetch;