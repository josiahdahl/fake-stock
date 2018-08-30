import PropTypes from 'prop-types';
import React from 'react';
import { Container, Header } from 'semantic-ui-react';

export const PrivacyPolicy = () => {
  return (
    <Container text>
      <Header as='h3'>Terms of Use & Privacy Policy</Header>
      <p>No warranty or guarantee of accurate data is implied by the use of this site. By using this site you accept
        that no investment advice is being given - this is all for fun. The author of this site has no affiliation
        with <a href="https://www.investopedia.com" target="_blank"
                rel="noopener noreferrer">Investopedia</a> or
        with <a href="https://iextrading.com" target="_blank" rel="noopener noreferrer">IEX</a>.</p>
      <p>There are no analytics or tracking scripts on this app - the author doesn't care if you visit it or not (though
        he hopes you find it interesting).
        Some data is stored locally. There is a list of stock symbols and information downloaded from IEX to speed up
        the search function. There is also a history
        of all data imported (i.e. a portfolio) and stocks searched. To remove this data, clear your browser's storage.
        It is not sent anywhere or used in any capacity beyond
        persisting data across the user's sessions.</p>
    </Container>
  );
};

