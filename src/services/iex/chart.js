import { apiFactory as api } from './index';

/**
 * https://iextrading.com/developer/docs/#chart
 * chartReset: boolean
 * chartSimplify: boolean
 * chartInterval: number
 * changeFromClose: boolean
 * chartLast: number
 * @type {{chartReset: null, chartSimplify: null, chartInterval: null, changeFromClose: null, chartLast: null}}
 */
export const defaultParameters = {
  chartReset: null,
  chartSimplify: null,
  chartInterval: null,
  changeFromClose: null,
  chartLast: null,
};

export const ranges = {
  FIVE_YEARS: '/5y',
  TWO_YEARS: '/2y',
  ONE_YEAR: '/1y',
  YTD: '/ytd',
  SIX_MONTHS: '/6m',
  THREE_MONTHS: '/3m',
  ONE_MONTH: '/1m',
  ONE_DAY: '/1d',
  DATE: date => `/date/${date}`,
  DYNAMIC: '/dynamic',
};

export const chart = (symbol, range, parameters) => api.get(`/stock/${symbol}/chart`)(range, { ...defaultParameters, ...parameters });