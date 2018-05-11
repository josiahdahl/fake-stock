import { CACHE_STOCK } from '../actions/stocks';

const initialState = {
  symbols: [],
  entities: {},
};

export const stocks = (state = initialState, action) => {
  switch (action.type) {
    case CACHE_STOCK: {

      const { symbols, entities } = state;
      const { symbol } = action.stock;

      // We don't have the symbol yet
      if (symbols.indexOf(symbol) === -1) {
        return {
          ...state,
          symbols: [...symbols, symbol],
          entities: { ...entities, [symbol]: action.stock },
        }
      }

      // Update the symbol entity just in case something's changed
      return {
        ...state,
        entities: { ...entities, [symbol]: action.stock },
      }
    }
    default: {
      return state;
    }
  }
};