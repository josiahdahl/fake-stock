import { createPortfolioRecord, parseInvestopediaPortfolio } from '../services/portfolio.service';

export const IMPORT_PORTFOLIO = 'IMPORT_PORTFOLIO';

function importPortfolio(portfolio) {
  return {
    type: IMPORT_PORTFOLIO,
    portfolio,
  }
}

export function importFromInvestopedia(text) {
  return function (dispatch) {
    const stocks = parseInvestopediaPortfolio(text);
    const portfolio = createPortfolioRecord(stocks);

    dispatch(importPortfolio(portfolio));
    return Promise.resolve(portfolio);
  }
}
