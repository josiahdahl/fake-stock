import PropTypes from 'prop-types';
import React from 'react';
import { Item } from 'semantic-ui-react';

export const CompanyProfile = ({ logo, symbol, description }) => {
  return (
    logo && symbol && description
      ? <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header>
              <Item.Image size="tiny" src={logo}/>
              {symbol}
            </Item.Header>
            <Item.Description content={description}/>
          </Item.Content>
        </Item>
      </Item.Group>
      : <p style={{ color: '#aaa', textAlign: 'center' }}>No results</p>
  )
    ;
};

CompanyProfile.propTypes = {
  logo: PropTypes.string,
  symbol: PropTypes.string,
  description: PropTypes.string,
};