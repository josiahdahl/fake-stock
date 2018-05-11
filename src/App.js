import React, { Component } from 'react';
import { Card, Container, Grid } from 'semantic-ui-react';
import { StockSearch } from "./containers/StockSearch";
import { AddStocksForm } from "./containers/AddStocksForm";
import { RecentItemsList } from './containers/RecentItemsList';
import { SearchResult } from './containers/SearchResult';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <Container fluid={true}>
          <Grid>
            <Grid.Row>
              <Grid.Column mobile={6}>
                <Card>
                  <Card.Content>
                    <StockSearch/>
                  </Card.Content>
                  <Card.Content>
                    <Card.Header>Recent Searches</Card.Header>
                    <RecentItemsList/>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column mobile={10}>
                <Grid.Row>
                  <Grid.Column>
                    <SearchResult/>
                  </Grid.Column>
                  <Grid.Column>
                    <AddStocksForm/>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
