import uuidV1 from 'uuid/v1';

/**
 * Take text copied from the Investopedia portfolio page and parse it for use
 * Example line:
 *   Action | Symbol | Name | Amount Owned | Purchase Price | Current Price | Current value | Gained Today | Gained Overall
 *   --|--|--|--|--|--|--|--|--
 *   Sell |  CRNT | CERAGON NETWORKS LTD | 1500 | $2.67 | $2.82 | $4,230.00 | $15.00(0.36 %) | $225.00(5.62 %)
 * @param text
 * @return {*[]}
 */
export const parseInvestopediaPortfolio = (text) => {
  const re = new RegExp(/^(\w+)\D+(\d+)\s\$(\d+\.\d+)/);

  return text.split('\n')
    .map(line => line.replace(/^Sell\s+/g, ''))
    .map(line => line.replace(/\s+/g, ' '))
    .map(line => line.trim())
    .filter(line => !line.startsWith('SYMBOL'))
    .filter(line => re.test(line))
    .reduce((stocks, stock) => {
      const [/**/, symbol, quantity, purchasePrice] = stock.match(re);
      return [
        ...stocks,
        {
          symbol,
          quantity: parseInt(quantity, 10),
          // Given a purchase price 12.00, multiply by 100 to get 1200.00 (cents) then floor for an integer
          purchasePrice: Math.floor((parseFloat(purchasePrice) * 100)),
        },
      ];
    }, []);
};

/**
 * Create a portfolio record given an array of stock items
 * @param stocks Array<{symbol: string; quantity: number; purchasePrice:
 * @return {{id: *, date: number, stocks: *}}
 */
export const createPortfolioRecord = (stocks) => {
  const id = uuidV1();
  const date = Date.now();
  return {
    id,
    date,
    stocks,
  }
};