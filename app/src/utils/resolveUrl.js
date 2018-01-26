import { BASE_URI } from '../constants';

const createQueryString = (params) => 
  Object.keys(params)
    .map(paramKey => `${encodeURIComponent(paramKey)}=${encodeURIComponent(params[paramKey])}`)
    .join('&');

const resolveUrl = (endpoint, params) => {
  return `${BASE_URI}?${createQueryString(params)}`;
};

export default resolveUrl;