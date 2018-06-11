import PropTypes from 'prop-types';
import React from 'react';
import { Sparklines, SparklinesCurve, SparklinesReferenceLine } from 'react-sparklines';

const errorResponse = <div style={{ height: '30px', display: 'flex', color: '#444', alignItems: 'center' }}>
  Sparkline: Insufficient data
</div>;

export const StockSparkline = ({ chart }) => {
  if (!chart) {
    return errorResponse;
  }
  const { chartData } = chart;
  return (
    chartData.length > 5
      ? <Sparklines data={chartData} width={150} height={30} margin={5}>
        <SparklinesCurve style={{ strokeWidth: 1, stroke: '#22800b', fill: "none" }}/>
        <SparklinesReferenceLine type='mean'
                                 style={{ strokeWidth: 1, stroke: '#0e3305', fill: 'none', strokeDasharray: '4, 2' }}/>
      </Sparklines>
      : errorResponse
  )
    ;
};

StockSparkline.propTypes = {
  chart: PropTypes.object.isRequired,
};