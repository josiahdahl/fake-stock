import React, { Component } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import { StockSearch } from "./containers/StockSearch";
import { RecentItemsList } from './containers/RecentItemsList';
import { SearchResult } from './containers/SearchResult';
import { DefaultView } from './views/DefaultView';
import { StockPortfolio } from './containers/StockPortfolio';

class App extends Component {
  constructor() {
    super();
  }

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
