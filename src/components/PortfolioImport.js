import PropTypes from 'prop-types';
import React from 'react';
import { Form, GridColumn, GridRow } from 'semantic-ui-react';

export const PortfolioImport = ({ rawPortfolio, handleSubmit, handleChange }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <GridRow>
        <GridColumn>
          <Form.TextArea label="Stocks Table" name="rawStocks" value={rawPortfolio} onChange={handleChange}/>
        </GridColumn>
      </GridRow>
      <GridRow>
        <Form.Button content="Submit"/>
      </GridRow>
    </Form>
  );
};

PortfolioImport.propTypes = {
  rawPortfolio: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};