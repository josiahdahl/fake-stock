import PropTypes from 'prop-types';
import React from 'react';
import { Image, List } from 'semantic-ui-react';
import { RecentItem } from './RecentItem';

export const RecentItems = ({ companies }) => (
  <List>
    {companies.map(company => <RecentItem key={company.symbol} {...company}/>)}
  </List>
);

RecentItems.propTypes = {};