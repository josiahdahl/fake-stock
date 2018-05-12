import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { PortfolioImport } from '../components/PortfolioImport';
import { importFromInvestopedia } from '../actions/portfolio';
import { PortfolioCurrent } from '../components/PortfolioCurrent';
import { getStockPrices } from '../actions/stocks';
import { StockListingService } from '../services/stock-listings';
import { Tab } from 'semantic-ui-react';

class StockPortfolioComponent extends Component {
  static propTypes = {
    importFromInvestopedia: PropTypes.func.isRequired,
    updatePrices: PropTypes.func.isRequired,
    portfolio: PropTypes.object,
    currentPrices: PropTypes.object,
  };

  stockListingService = StockListingService();

  priceUpdateInterval;

  state = {
    rawPortfolio: '',
  };

  constructor(props) {
    super(props);
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      rawPortfolio: value,
    });
  }

  handleSubmit() {
    const { rawPortfolio } = this.state;
    this.props.importFromInvestopedia(rawPortfolio)
      .then(portfolio => this.props.updatePrices(portfolio.stocks));
    this.resetImport();
  }

  resetImport() {
    this.setState({
      rawPortfolio: '',
    });
  }

  setupStockPriceWatch() {
    this.priceUpdateInterval = setInterval(() => {
      const { portfolio = { stocks: [] } } = this.props;
      const { stocks } = portfolio;
      this.props.updatePrices(stocks);
    }, 1000 * 60 * 5 /* 5 minutes */);
    // TODO: Dynamically set timeout based on current time/market open time
  }

  componentDidMount() {
    this.setupStockPriceWatch();
  }

  componentWillUnmount() {
    if (this.priceUpdateInterval) {
      clearInterval(this.priceUpdateInterval);
    }
  }

  render() {
    const { rawPortfolio } = this.state;
    const { portfolio = { stocks: [] }, currentPrices } = this.props;

    const stocks = portfolio
      ? portfolio.stocks.map(s => ({ ...s, currentPrice: currentPrices[s.symbol] || 0 }))
      : [];

    const panes = [
      {menuItem: 'Portfolio', render: () => <Tab.Pane>{portfolio ? <PortfolioCurrent stocks={stocks}/> : 'No portfolio, please import'}</Tab.Pane>},
      {menuItem: 'Import', render: () => <Tab.Pane><PortfolioImport
          rawPortfolio={rawPortfolio}
          handleChange={(e) => this.handleChange(e)}
          handleSubmit={() => this.handleSubmit()}
        /></Tab.Pane>}
    ];
    return (
      <Tab panes={panes}/>
    );
  }
}

const mapStateToProps = (state) => {
  const { portfolio, stocks } = state;
  const { currentPrices } = stocks;

  return {
    portfolio: portfolio.currentId
      ? portfolio.entities[portfolio.currentId]
      : null,
    currentPrices,
  }
};

const mapDispatchToProps = dispatch => ({
  importFromInvestopedia: text => dispatch(importFromInvestopedia(text)),
  updatePrices: stocks => dispatch(getStockPrices(stocks)),
});

export const StockPortfolio = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StockPortfolioComponent);
