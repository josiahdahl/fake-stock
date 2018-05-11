import { StockListingService } from '../services/stock-listings';

const stockListingService = StockListingService();

export const SEARCH_STOCK = 'STOCKS_SEARCH';

function searchStock(stock) {
  return {
    type: SEARCH_STOCK,
    stock,
  }
}

export const SET_CURRENT_STOCK = 'SET_CURRENT_STOCK';

function setCurrentStock(stock) {
  return {
    type: SET_CURRENT_STOCK,
    stock,
  }
}

export const ADD_RECENT_STOCK = 'ADD_RECENT_STOCK';

function addRecentStock(stock) {
  return {
    type: ADD_RECENT_STOCK,
    stock,
  }
}


export function getStock(symbol) {
  return function (dispatch) {
    return Promise.all([
      stockListingService.getCompany(symbol),
      stockListingService.getLogo(symbol),
    ])
      .then(([{ data: company }, { data: logo }]) => {
        const { url } = logo;
        const stock = {
          ...company,
          logo: url,
        };

        dispatch(setCurrentStock(stock));
        dispatch(addRecentStock(stock));
      });
  }
}