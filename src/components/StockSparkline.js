import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { chart, ranges } from '../services/iex/chart';

export class StockSparkline extends Component {
  static SPARKLINE_REFESH_TIMEOUT = 1000 * 60 * 5;  // five minutes
  static propTypes = {
    symbol: PropTypes.string,
  };

  state = {
    chartData: [],
    updated: null,
    updateInterval: null,
  };

  constructor(props) {
    super(props);
    this.loadChartData();
  }

  loadChartData() {
    const { symbol } = this.props;
    chart(symbol, ranges.ONE_DAY, { chartInterval: 5 })
      .then(({ data }) => {
        const chartData = data.filter(d => d.average !== -1)
          .map(d => d.average);
        const updated = Date.now();

        const { updateInterval } = this.state;

        if (updateInterval !== null) {
          clearInterval(updateInterval);
        }

        const newUpdateInterval = setInterval(() => this.loadChartData(), StockSparkline.SPARKLINE_REFESH_TIMEOUT);

        this.setState({
          chartData,
          updated,
          updateInterval: newUpdateInterval,
        });
      });
  }

  render() {
    const { chartData } = this.state;
    return (
      chartData.length > 5
        ? <Sparklines data={chartData} width={150} height={30} margin={5}>
          <SparklinesLine style={{ strokeWidth: 1, stroke: '#22800b', fill: "none" }}/>
        </Sparklines>
        : <div style={{ height: '30px', display: 'flex', color: '#444', alignItems: 'center' }}>
          Sparkline: Insufficient data
        </div>
    );
  }
}