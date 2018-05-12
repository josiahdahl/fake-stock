import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { DefaultView } from './views/DefaultView';
import { StockPortfolio } from './containers/StockPortfolio';

class App extends Component {
  render() {
    return (
      <div className="App" style={{height: '100%'}}>
        <DefaultView>
          <Grid padded='horizontally'>
            <Grid.Column width={16}>
              <StockPortfolio/>
            </Grid.Column>
          </Grid>
        </DefaultView>
      </div>
    );
  }
}

export default App;
