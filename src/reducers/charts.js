import { SAVE_ONE_DAY_CHART } from '../actions/charts';
import { ranges } from '../services/iex/chart';

const initialState = {
  [ranges.ONE_DAY]: {},
};

export const charts = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ONE_DAY_CHART: {
      const { chartData, symbol } = action;
      const updated = Date.now();

      return {
        ...state,
        [ranges.ONE_DAY]: {
          ...state[ranges.ONE_DAY],
          [symbol]: {
            chartData,
            updated,
          },
        },
      }
    }
    default: {
      return state;
    }
  }
};