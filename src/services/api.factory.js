import Axios from 'axios';
import toPairs from 'lodash/toPairs';

const filterUnsetParams = pair => (pair[1] !== undefined && pair[1] !== null);

const mapToQueryString = ([key, value]) => `${key}?${value}`;

const buildQueryString = (queryString, parameters, i) => i === 0 ? `?${queryString}` : `&${queryString}`;

const queryBuilder = (parameters) => {
  return toPairs(parameters)
    .filter(filterUnsetParams)
    .map(mapToQueryString)
    .reduce(buildQueryString, '');
};

const get = baseURI => endpoint => (uri, parameters) => {
  return Axios.get(`${baseURI}${endpoint}${uri}${queryBuilder(parameters)}`);
};

export const apiFactory = baseURI => ({
  get: get(baseURI),
});