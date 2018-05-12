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
      <div className="App">
        <DefaultView>
          <Grid padded='horizontally'>
            <Grid.Column width={5}>
              <Card>
                <Card.Content>
                  <StockSearch/>
                </Card.Content>
                <Card.Content>
                  <SearchResult/>
                </Card.Content>
                <Card.Content>
                  <Card.Header>Recent Searches</Card.Header>
                  <RecentItemsList/>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={11}>
              <StockPortfolio/>
            </Grid.Column>
          </Grid>
        </DefaultView>
      </div>
    );
  }
}

export default App;
