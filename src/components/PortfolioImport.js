import PropTypes from 'prop-types';
import React from 'react';
import { Form, GridColumn, GridRow, Header, Image, TextArea } from 'semantic-ui-react';
import helpImage from '../assets/import-help.jpg';

export const PortfolioImport = ({ rawPortfolio, handleSubmit, handleChange }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <GridRow>
        <GridColumn>
          <Form.Field>
            <label>Import from Investopedia</label>
            <TextArea name="rawStocks" value={rawPortfolio}
                      onChange={handleChange}/>
          </Form.Field>
        </GridColumn>
      </GridRow>
      <GridRow>
        <Form.Button color='vk' content="Import" style={{ margin: '1em 0', }}/>
      </GridRow>
      <GridRow>
        <Header size='small'>Help</Header>
        <p>Select your portfolio, copy it, and paste into the box above.</p>
        <Image src={helpImage} alt='How to import from Investopedia'/>
      </GridRow>
    </Form>
  );
};

PortfolioImport.propTypes = {
  rawPortfolio: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};