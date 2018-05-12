import Axios from 'axios';

export const endpoint = 'https://api.iextrading.com/1.0';

export const getSymbols = () => Axios.get(`${endpoint}/ref-data/symbols`);

export const getCompany = symbol => Axios.get(`${endpoint}/stock/${symbol}/company`);

export const getLogo = symbol => Axios.get(`${endpoint}/stock/${symbol}/logo`);

/**
 * https://iextrading.com/developer/docs/#batch-requests
 * Example: getBatch(['aapl', 'goog'], ['price']);
 *
 * If chart is included in types, add chartOpts object
 * Example: getBatch(['aapl', 'goog'], ['price', 'chart'], { range: '1m' });
 * @param symbols
 * @param types
 * @param chartOpts
 * @return Promise
 */
export const getMarketBatch = (
  symbols = [],
  types = ['price'],
  chartOpts = {}
) => {
  if (symbols.length === 0) {
    throw new Error('Please pass in at least one valid symbol');
  }

  const chartDefaults = {
    range: '1m',
    chartReset: false,
    chartSimplify: false,
    chartInterval: 1,
  };


  let params = {
    symbols: symbols.join(','),
    types: types.join(','),
  };

  if (symbols.indexOf('chart') !== -1) {
    params = {
      ...params,
      ...{
        ...chartDefaults,
        ...chartOpts,
      },
    };
  }

  const queryString = Object.keys(params)
    .reduce((acc, key) => `${acc}&${key}=${params[key]}`, '');

  return Axios.get(`${endpoint}/stock/market/batch?${queryString}`);
};