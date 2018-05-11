import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getStock } from '../actions/search';
import { StockListingService } from '../services/stock-listings';


export class StockSearchComponent extends Component {
  stockListing = null;
  loadStock;

  state = {
    loading: false,
    results: [],
    value: '',
  };

  constructor(props) {
    super(props);
    const { loadStock } = props;
    this.loadStock = loadStock;
    this.stockListing = StockListingService();
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title });
    this.loadStock(result.symbol);
  };


  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    if (value.length < 1) return this.resetComponent();

    const isMatch = result => result.symbol.toLowerCase().startsWith(value.toLowerCase());

    this.setState({
      isLoading: false,
      results: this.stockListing.stocks.filter(isMatch),
      value,
    });

  };

  render() {
    const { isLoading, value, results } = this.state;

    const stocks = results.map(result => ({ title: result.symbol, description: result.name, symbol: result.symbol, }));

    return (
      <Search loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              results={stocks}
              value={value}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  loadStock: symbol => dispatch(getStock(symbol)),
});

export const StockSearch = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StockSearchComponent);