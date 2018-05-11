import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { PortfolioImport } from '../components/PortfolioImport';
import { importFromInvestopedia } from '../actions/portfolio';
import { PortfolioCurrent } from '../components/PortfolioCurrent';

class StockPortfolioComponent extends Component {
  static propTypes = {
    importFromInvestopedia: PropTypes.func.isRequired,
    portfolio: PropTypes.object,
  };

  state = {
    rawPortfolio: '',
  };

  investopediaImport;

  constructor(props) {
    super(props);
    const { importFromInvestopedia: investopediaImport, portfolio } = props;
    this.investopediaImport = investopediaImport;
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      rawPortfolio: value,
    });
  }

  handleSubmit() {
    const { rawPortfolio } = this.state;
    this.investopediaImport(rawPortfolio);
    this.resetImport();
  }

  resetImport() {
    this.setState({
      rawPortfolio: '',
    });
  }

  render() {
    const { rawPortfolio } = this.state;
    const { portfolio } = this.props;
    return (
      <div>
        {portfolio ? <PortfolioCurrent portfolio={portfolio}/> : ''}
        <PortfolioImport
          rawPortfolio={rawPortfolio}
          handleChange={(e) => this.handleChange(e)}
          handleSubmit={() => this.handleSubmit()}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ portfolio }) => ({
  portfolio: portfolio.currentId
    ? portfolio.entities[portfolio.currentId]
    : null
});

const mapDispatchToProps = dispatch => ({
  importFromInvestopedia: text => dispatch(importFromInvestopedia(text)),
});

export const StockPortfolio = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StockPortfolioComponent);
