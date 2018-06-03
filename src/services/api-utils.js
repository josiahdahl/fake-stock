import Axios from 'axios';
import toPairs from 'lodash/toPairs';


export const filterUnsetParams = pair => (typeof pair[1] === 'string' || typeof pair[1] === 'boolean' || typeof pair[1] === 'number');

export const mapToQueryString = ([key, value]) => `${key}=${value}`;

export const buildQueryString = (queryString, parameters, i) => i === 0 ? `?${parameters}` : `${queryString}&${parameters}`;

export const queryBuilder = (parameters) => {
  return toPairs(parameters)
    .filter(filterUnsetParams)
    .map(mapToQueryString)
    .reduce(buildQueryString, '');
};

export const urlBuilder = (baseURI, endpoint, uri, parameters) => `${baseURI}${endpoint}${uri}${queryBuilder(parameters)}`;

export const get = baseURI => endpoint => (uri, parameters) => {
  return Axios.get(urlBuilder(baseURI, endpoint, uri, parameters));
};

export const apiFactory = baseURI => ({
  get: get(baseURI),
});