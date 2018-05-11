import PropTypes from 'prop-types';
import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

export const DefaultView = ({ children }) => {
  return (
    <Container fluid={true}>
      <Menu>
        <Menu.Item
          name='dashboard'
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          name='research'
        >
          Research
        </Menu.Item>
      </Menu>
      {children}
    </Container>
  );
};

DefaultView.propTypes = {};