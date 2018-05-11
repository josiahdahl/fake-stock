import { SEARCH_STOCK, ADD_RECENT_STOCK, SET_CURRENT_STOCK } from '../actions/search';

const initialState = {
  current: {},
  history: [],
  // isFetching: false,
};

export const search = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_STOCK: {
      return {
        ...state,
        current: action.stock,
      }
    }
    case ADD_RECENT_STOCK: {
      return {
        ...state,
        // Return the last 10 searched stocks
        history: [action.stock, ...state.history].slice(0, 10),
      }
    }
    default: {
      return state;
    }
  }
};