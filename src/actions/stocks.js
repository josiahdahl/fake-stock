import { StockListingService } from '../services/stock-listings';

const stockListingService = StockListingService();

export const CACHE_STOCK = 'CACHE_STOCK';

function cacheStock(stock) {
  return {
    type: CACHE_STOCK,
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
        dispatch(cacheStock(stock));
        return stock;
      });
  }
}

export const SET_CURRENT_PRICE = 'SET_CURRENT_PRICE';

function setCurrentPrice(symbol, price) {
  return {
    type: SET_CURRENT_PRICE,
    symbol,
    price,
  }
}

export function getStockPrices(stocks) {
  return function (dispatch) {
    const symbols = stocks.map(s => s.symbol);
    if (symbols.length === 0) {
      return Promise.resolve();
    }
    return stockListingService.getMarketBatch(symbols)
      .then(({ data }) => {
        Object.keys(data).forEach(symbol => dispatch(setCurrentPrice(symbol, data[symbol].price)));
        return Promise.resolve();
      });
  }
}