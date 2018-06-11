import PropTypes from 'prop-types';
import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';


export const StockSparkline = ({ chart }) => {

  const { chartData } = chart;
  return (
    chartData.length > 5
      ? <Sparklines data={chartData} width={150} height={30} margin={5}>
        <SparklinesLine style={{ strokeWidth: 1, stroke: '#22800b', fill: "none" }}/>
      </Sparklines>
      : <div style={{ height: '30px', display: 'flex', color: '#444', alignItems: 'center' }}>
        Sparkline: Insufficient data
      </div>
  );
};

StockSparkline.propTypes = {
  chart: PropTypes.object.isRequired,
};