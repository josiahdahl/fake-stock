import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import { PortfolioImport } from '../components/PortfolioImport';
import { importFromInvestopedia } from '../actions/portfolio';
import { PortfolioCurrent } from '../components/PortfolioCurrent';
import { getStockPrices } from '../actions/stocks';
import { StockListingService } from '../services/stock-listings';

class StockPortfolioComponent extends Component {
  static propTypes = {
    importFromInvestopedia: PropTypes.func.isRequired,
    updatePrices: PropTypes.func.isRequired,
    portfolio: PropTypes.object,
    currentPrices: PropTypes.object,
  };

  stockListingService = StockListingService();

  priceUpdateInterval;
  currentTimeInterval;


  state = {
    rawPortfolio: '',
    activeIndex: 0,
    lastPricesUpdate: 0,
    currentTime: 0,
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
    // this.props.importFromInvestopedia(rawPortfolio)
    //   .then(portfolio => this.props.updatePrices(portfolio.stocks));
    this.props.importFromInvestopedia(rawPortfolio)
      .then(() => this.updatePrices());
    this.resetImport();
    // Navigate back to portfolio tab
    this.setState({
      activeIndex: 0,
    });
  }

  handleTabChange(e, { activeIndex }) {
    this.setState({
      activeIndex,
    });
  }

  resetImport() {
    this.setState({
      rawPortfolio: '',
    });
  }

  updatePrices() {
    const { portfolio = { stocks: [] } } = this.props;
    const { stocks } = portfolio;
    this.props.updatePrices(stocks)
      .then(() => {
        this.setState({
          lastPricesUpdate: Date.now(),
          currentTime: Date.now(),
        });
      });
  }

  setupStockPriceWatch() {
    this.priceUpdateInterval = setInterval(() => {
      this.updatePrices();
    }, 1000 * 60 * 5 /* 5 minutes */);

    // Update current time every 15 seconds to calculate time since last update
    this.currentTimeInterval = setInterval(() => {
      this.setState({
        currentTime: Date.now(),
      });
    }, 1000 * 15)
    // TODO: Dynamically set timeout based on current time/market open time
  }

  componentDidMount() {
    this.setupStockPriceWatch();
  }

  componentWillUnmount() {
    clearInterval(this.priceUpdateInterval);
    clearInterval(this.currentTimeInterval);
  }

  render() {
    const { rawPortfolio, activeIndex, lastPricesUpdate, currentTime } = this.state;
    const { portfolio = { stocks: [] }, currentPrices } = this.props;

    const stocks = portfolio
      ? portfolio.stocks.map(s => ({ ...s, currentPrice: currentPrices[s.symbol] || 0 }))
      : [];

    const createdDate = portfolio ? format(parse(portfolio.date), 'MMM D, YYYY h:mm:ssa') : '';

    const lastUpdate = `Prices Updated ${differenceInSeconds(currentTime, lastPricesUpdate)} seconds ago`;

    const panes = [
      {
        menuItem: 'Portfolio',
        render: () => <Tab.Pane>{
          portfolio
            ? <PortfolioCurrent
              createdDate={createdDate}
              lastUpdate={lastUpdate}
              stocks={stocks}/>
            : 'No portfolio, please import'
        }
        </Tab.Pane>
      },
      {
        menuItem: 'Import', render: () =>
          <Tab.Pane>
            <PortfolioImport
              rawPortfolio={rawPortfolio}
              handleChange={(e) => this.handleChange(e)}
              handleSubmit={() => this.handleSubmit()}
            />
          </Tab.Pane>
      }
    ];
    return (
      <Tab
        panes={panes}
        activeIndex={activeIndex}
        onTabChange={(e, data) => this.handleTabChange(e, data)}
      />
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
