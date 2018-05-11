import React, { Component } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import { StockSearch } from "./containers/StockSearch";
import { AddStocksForm } from "./containers/AddStocksForm";
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
          <Grid columns={3}>
            <Grid.Column>
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
            <Grid.Column>
              <Grid.Row>
                <Grid.Column>
                </Grid.Column>
                <Grid.Column>
                  <StockPortfolio />
                  {/*<AddStocksForm/>*/}
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </DefaultView>
      </div>
    );
  }
}

export default App;
