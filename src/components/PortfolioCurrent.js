import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'semantic-ui-react';

const StockHeaders = ({ headers }) =>
  <Table.Row>
    {headers.map((text, i) => <Table.HeaderCell key={i}>{text}</Table.HeaderCell>)}
  </Table.Row>;

const StockRow = ({ symbol, purchasePrice, quantity }) => <Table.Row>
  <Table.Cell><b>{symbol}</b></Table.Cell>
  <Table.Cell>${(purchasePrice / 100).toFixed(2)}</Table.Cell>
  <Table.Cell>{quantity}</Table.Cell>
</Table.Row>;


export const PortfolioCurrent = ({ headers = ['Symbol', 'Purchase Price', 'Quantity'], portfolio }) => {
  return (
    <Table celled>
      <Table.Header>
        <StockHeaders headers={headers}/>
      </Table.Header>
      <Table.Body>
        {portfolio.stocks.map(stock => <StockRow key={stock.symbol} {...stock}/>)}
      </Table.Body>
    </Table>
  );
};

PortfolioCurrent.propTypes = {};