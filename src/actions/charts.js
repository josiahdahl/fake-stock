import { chart, ranges } from '../services/iex/chart';

export const SAVE_ONE_DAY_CHART = 'SAVE_ONE_DAY_CHART';

function saveOneDayChart(chartData, symbol) {
  return {
    type: SAVE_ONE_DAY_CHART,
    chartData,
    symbol,
  }
}

export function getOneDayChart(symbol) {
  return function (dispatch) {
    return chart(symbol, ranges.ONE_DAY, { chartInterval: 5 })
      .then(({data}) => {
        const chartData = data.filter(d => d.average !== -1)
          .map(d => d.average);

        dispatch(saveOneDayChart(chartData, symbol));
      });
  }
}
