import { CACHE_STOCK, SET_CURRENT_PRICE } from '../actions/stocks';

const initialState = {
  symbols: [],
  entities: {},
  currentPrices: {},
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
    case SET_CURRENT_PRICE: {
      const { symbol, price } = action;
      return {
        ...state,
        currentPrices: {
          ...state.currentPrices,
          [symbol]: Math.floor(parseFloat(price) * 100),
        },
      }
    }
    default: {
      return state;
    }
  }
};