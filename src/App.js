import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { DefaultView } from './views/DefaultView';
import { StockPortfolio } from './containers/StockPortfolio';
import { PrivacyPolicy } from './components/PrivacyPolicy';

class App extends Component {
  render() {
    return (
      <div className="App" style={{ minHeight: '100%', paddingBottom: '1rem' }}>
        <DefaultView>
          <Grid padded='horizontally'>
            <Grid.Row>
              <Grid.Column width={16}>
                <StockPortfolio/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <PrivacyPolicy/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </DefaultView>
      </div>
    );
  }
}

export default App;
