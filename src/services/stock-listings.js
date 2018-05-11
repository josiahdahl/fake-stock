import * as api  from './iex.api';

class StockListingClass {
  LOCAL_KEY = 'stock_listings';
  stocks;
  _isLoaded = false;

  constructor() {
    this.setup();
  }

  get loaded() {
    return this._isLoaded;
  }

  setup() {
    this.loadStocks();
  }

  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  loadStocks() {
    return new Promise((resolve, reject) => {
      if (this.getItem(this.LOCAL_KEY)) {
        this.stocks = this.getItem(this.LOCAL_KEY);
        this._isLoaded = true;
        resolve();
      } else {
        api.symbols()
          .then(({ data }) => {
            this.setItem(this.LOCAL_KEY, data);
            this.stocks = data;
            this._isLoaded = true;
            resolve();
          }, () => reject());
      }
    });
  }

  getCompany(symbol) {
    return api.company(symbol);
  }

  getLogo(symbol) {
    return api.logo(symbol);
  }
}

let stockListingSingleton = null;

export const StockListingService = () => {
  if (!stockListingSingleton) {
    stockListingSingleton = new StockListingClass();
  }

  return stockListingSingleton;
};