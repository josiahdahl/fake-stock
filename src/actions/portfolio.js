export const IMPORT_PORTFOLIO_ITEM = 'IMPORT_PORTFOLIO_ITEM';

function importPortfolioItem(item) {
  return {
    type: IMPORT_PORTFOLIO_ITEM,
    item,
  }
}