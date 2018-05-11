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
  debugger;
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
