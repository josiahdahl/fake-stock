import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { DefaultView } from './views/DefaultView';
import { StockPortfolio } from './containers/StockPortfolio';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { About } from './components/About';

const Router = component => {
  switch (component) {
    case 'portfolio':
      window.history.pushState(undefined, undefined, '/portfolio');
      document.title = 'Portfolio - Fake Stock';
      return <StockPortfolio/>;
    case 'privacy-policy':
      window.history.pushState(undefined, undefined, '/privacy-policy');
      document.title = 'Privacy Policy - Fake Stock';
      return <PrivacyPolicy/>;
    case 'about':
      window.history.pushState(undefined, undefined, '/about');
      document.title = 'About - Fake Stock';
      return <About/>;
    default:
      window.history.pushState(undefined, undefined, '/');
      document.title = 'Fake Stock';
      return <StockPortfolio/>;
  }
};

class App extends Component {
  state = {
    route: 'portfolio',
  };

  constructor(props) {
    super(props);
    this.handleNavigate = this.handleNavigate.bind(this);
    const currentRoute = window.location.pathname.replace('/', '');
    this.state.route = ['portfolio', 'privacy-policy', 'about'].indexOf(currentRoute) > -1 ? currentRoute : '';
    this.setupRouter();
  }

  handleNavigate(route) {
    this.setState({
      route,
    });
  }

  setupRouter() {
    // Navigation listener
    window.onpopstate = () => {
      const route = window.location.pathname;
      this.handleNavigate(route.replace('/', ''));
    };
  }

  render() {
    const { route } = this.state;
    return (
      <div className="App" style={{ minHeight: '100%', paddingBottom: '1rem' }}>
        <DefaultView handleNavigate={this.handleNavigate}>
          <Grid padded='horizontally'>
            <Grid.Row>
              <Grid.Column width={16}>
                {Router(route)}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <a href="/privacy-policy" onClick={(e) => {
                  e.preventDefault();
                  this.handleNavigate('privacy-policy')
                }}>Privacy Policy</a> | <a href="https://github.com/josiahdahl/fake-stock">Fake Stock on GitHub</a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </DefaultView>
      </div>
    );
  }
}

export default App;
