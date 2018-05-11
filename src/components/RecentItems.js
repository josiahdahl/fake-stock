import PropTypes from 'prop-types';

import React from 'react';
import { List } from 'semantic-ui-react';
import { RecentItem } from './RecentItem';

export const RecentItems = ({ companies }) => (
  <List>
    {companies.map((company, i) => <RecentItem key={i} {...company}/>)}
  </List>
);

RecentItems.propTypes = {
  companies: PropTypes.array.isRequired,
};