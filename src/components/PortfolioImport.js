import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, GridColumn, GridRow, Header, Image, TextArea } from 'semantic-ui-react';
import helpImage from '../assets/import-help.jpg';

export const PortfolioImport = ({ rawPortfolio, handleSubmit, handleChange }) => {
  // Sample portfolio taken 2018-08-30
  const sample = `
Sell	SSC	SEVEN STARS CLOUD GROUP INC	2000	$2.97	$4.04	$8,080.00	$0.00(0.00 %)	$2,140.00(36.03 %) 
Sell	TRVG	TRIVAGO N.V. SPONSORED ADR CLASS A	4500	$5.53	$4.46	$20,070.00	$0.00(0.00 %)	- $4,795.00(-19.28 %) 
Sell	INOV	INOVALON HOLDINGS, INC. CLASS A	1000	$9.59	$12.00	$12,000.00	$0.00(0.00 %)	$2,414.36(25.19 %) 
Sell	HTLD	HEARTLAND EXPRESS, INC.	500	$18.52	$20.65	$10,325.00	$0.00(0.00 %)	$1,067.50(11.53 %) 
Sell	UFI	UNIFI, INC.	400	$34.28	$32.38	$12,952.00	$0.00(0.00 %)	- $760.00(-5.54 %) 
Sell	VO	VANGUARD MID-CAP ETF	120	$157.58	$166.55	$19,986.00	$0.00(0.00 %)	$1,076.00(5.69 %) 
Sell	CRSP	CRISPR THERAPEUTICS AG	300	$67.25	$52.17	$15,651.00	$0.00(0.00 %)	- $4,525.35(-22.43 %) 
Sell	IMMU	IMMUNOMEDICS, INC.	400	$25.29	$25.76	$10,304.00	$0.00(0.00 %)	$188.00(1.86 %) 
Total	$109,368.00	$0.00(0.00 %)	- $3,194.49 (-2.84 %)
`;

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
        <Button color='grey' content='Try a Sample' onClick={() => handleChange({ target: {value: sample}})} type='button'/>
        <Button color='teal' content="Import" style={{ margin: '1rem', }} type='submit'/>
      </GridRow>
      <GridRow>
        <Header size='h3'>Help</Header>
        <p>Select your portfolio, copy it, and paste into the box above.</p>
        <Image src={helpImage} alt='How to import from Investopedia'/>
        <br/>
        <p>If you don't have Investopedia and would like to try it out, click the "Sample" button.</p>
      </GridRow>
    </Form>
  );
};

PortfolioImport.propTypes = {
  rawPortfolio: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};