import PropTypes from 'prop-types';
import React from 'react';
import { List, Image } from 'semantic-ui-react';

export const RecentItem = ({ logo, symbol, companyName }) => {
  return (
    <List.Item>
      <Image size="mini" src={logo}/>
      <List.Content>
        <List.Header>{symbol}</List.Header>
        <List.Description>{companyName.slice(0, 25)}{companyName.length > 25 ? '...' : ''}</List.Description>
      </List.Content>
    </List.Item>
  );
};

RecentItem.propTypes = {
  logo: PropTypes.string,
  symbol: PropTypes.string,
  companyName: PropTypes.string,
};