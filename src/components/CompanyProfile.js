import PropTypes from 'prop-types';
import React from 'react';
import { Item } from 'semantic-ui-react';

export const CompanyProfile = ({ logo, symbol, description }) => {
  return (
    logo && symbol && description
      ? <Item.Group>
        <Item>
          <Item.Image size="tiny" src={logo}/>
          <Item.Content>
            <Item.Header>{symbol}</Item.Header>
            <Item.Description content={description}/>
          </Item.Content>
        </Item>
      </Item.Group>
      : ''
  )
    ;
};

CompanyProfile.propTypes = {
  logo: PropTypes.string,
  symbol: PropTypes.string,
  description: PropTypes.string,
};