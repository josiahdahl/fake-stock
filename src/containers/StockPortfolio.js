import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import { PortfolioImport } from '../components/PortfolioImport';
import { importFromInvestopedia } from '../actions/portfolio';
import { PortfolioCurrent } from '../components/PortfolioCurrent';
import { getStockPrices } from '../actions/stocks';
import { getOneDayChart } from '../actions/charts';
import { ranges } from '../services/iex/chart';

class StockPortfolioComponent extends Component {
  static propTypes = {
    importFromInvestopedia: PropTypes.func.isRequired,
    updatePrices: PropTypes.func.isRequired,
    updateSparklines: PropTypes.func.isRequired,
    portfolio: PropTypes.object,
    currentPrices: PropTypes.object,
  };

  intervals = {
    priceUpdate: null,
    currentTime: null,
    sparklineUpdate: null,
  };

  state = {
    rawPortfolio: '',
    activeIndex: 0,
    lastPricesUpdate: 0,
    currentTime: 0,
  };

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      rawPortfolio: value,
    });
  }

  handleSubmit() {
    const { rawPortfolio } = this.state;
    this.props.importFromInvestopedia(rawPortfolio)
      .then(() => Promise.all([
          this.updatePrices(),
          this.updateSparklines(),
        ]
      ))
      .then(() => {
        this.resetImport();
        // Navigate back to portfolio tab
        this.setState({
          activeIndex: 0,
        });
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

  updateSparklines() {
    const { portfolio = { stocks: [] } } = this.props;
    const { stocks } = portfolio;

    stocks.forEach(({ symbol }) => {
      this.props.updateSparklines(symbol);
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

  setupIntervals() {
    this.intervals.priceUpdate = setInterval(() => {
      this.updatePrices();
    }, 1000 * 60 * 5 /* 5 minutes */);

    // Update current time every 15 seconds to calculate time since last update
    this.intervals.currentTime = setInterval(() => {
      this.setState({
        currentTime: Date.now(),
      });
    }, 1000 * 15);
    // TODO: Dynamically set timeout based on current time/market open time
    this.intervals.sparklineUpdate = setInterval(() => {
      this.updateSparklines();
    }, 1000 * 60 * 5 /* 5 minutes */);
  }

  clearIntervals() {
    for (let interval in this.intervals) {
      clearInterval(this.intervals[interval]);
    }
  }

  componentDidMount() {
    this.updatePrices();
    this.updateSparklines();
    this.setupIntervals();
  }

  componentWillUnmount() {
    this.clearIntervals();
  }

  render() {
    const { rawPortfolio, activeIndex, lastPricesUpdate, currentTime } = this.state;
    const { portfolio = { stocks: [] }, currentPrices, charts } = this.props;

    const chartData = charts[ranges.ONE_DAY];

    const stocks = portfolio
      ? portfolio.stocks.map(s => ({
        ...s,
        currentPrice: currentPrices[s.symbol] || 0,
        chart: chartData[s.symbol],
      }))
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
  const { portfolio, stocks, charts } = state;
  const { currentPrices } = stocks;


  return {
    portfolio: portfolio.currentId
      ? portfolio.entities[portfolio.currentId]
      : null,
    currentPrices,
    charts,
  }
};

const mapDispatchToProps = dispatch => ({
  importFromInvestopedia: text => dispatch(importFromInvestopedia(text)),
  updatePrices: stocks => dispatch(getStockPrices(stocks)),
  updateSparklines: symbol => dispatch(getOneDayChart(symbol)),
});

export const StockPortfolio = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StockPortfolioComponent);
