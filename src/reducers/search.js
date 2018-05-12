import { ADD_RECENT_STOCK, SET_CURRENT_STOCK } from '../actions/search';

const initialState = {
  current: null,
  history: [],
  entities: {},
};

export const search = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_STOCK: {
      return {
        ...state,
        current: action.symbol,
      }
    }
    case ADD_RECENT_STOCK: {
      return {
        ...state,
        // Return the last 10 searched stocks
        history: [action.symbol, ...state.history].slice(0, 10),
      }
    }
    default: {
      return state;
    }
  }
};