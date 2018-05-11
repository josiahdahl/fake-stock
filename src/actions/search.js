import { StockListingService } from '../services/stock-listings';
import { getStock } from './stocks';

const stockListingService = StockListingService();

export const SEARCH_STOCK = 'STOCKS_SEARCH';

// function searchStock(stock) {
//   return {
//     type: SEARCH_STOCK,
//     stock,
//   }
// }

export const SET_CURRENT_STOCK = 'SET_CURRENT_STOCK';

function setCurrentStock(symbol) {
  return {
    type: SET_CURRENT_STOCK,
    symbol,
  }
}

export const ADD_RECENT_STOCK = 'ADD_RECENT_STOCK';

function addRecentStock(symbol) {
  return {
    type: ADD_RECENT_STOCK,
    symbol,
  }
}


export function searchStock(symbol) {
  return function (dispatch) {
    return dispatch(getStock(symbol))
      .then((stock) => {
        dispatch(setCurrentStock(stock.symbol));
        dispatch(addRecentStock(stock.symbol));
      });
  }
}