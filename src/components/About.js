import React from 'react';
import { Container, Header, List } from 'semantic-ui-react';

export const About = () => {
  return (
    <Container text>
      <Header as='h2'>About Fake Stock</Header>
      <p><a href="https://github.com/josiahdahl/fake-stock/">Fake Stock on GitHub</a></p>
      <Header as='h3'>Genesis</Header>
      <p>In March of 2018 some friends and I started an investing competition through <a
        href="https://www.investopedia.com" target="_blank"
        rel="noopener noreferrer">Investopedia</a>.
        The UI wasn't the greatest, so I wanted to make something to get prices faster without having to refresh as well
        as search for stocks. Over time the
        allure wore off and I stopped playing, but I still think it's a cool project to share.</p>

      <Header as='h3'>Tech</Header>
      <p>Fake Stock is built with:</p>
      <List bulleted>
        <List.Item>React/Redux (Create React App base)</List.Item>
        <List.Item>Semantic UI React</List.Item>
        <List.Item><a href="https://iextrading.com/developer/" target="_blank" rel="noopener noreferrer">IEX Developer
          Platform</a> - Stock prices updated every 5 minutes</List.Item>
        <List.Item>A bleeding edge, disruptive algorithm for parsing user data (<a
          href="https://github.com/josiahdahl/fake-stock/blob/master/src/services/portfolio.service.js#L12-L33"
          target="_blank" rel="noopener noreferrer">aka regexes, maps, filters, and reduces</a>)
        </List.Item>
        <List.Item>Netlify</List.Item>
      </List>

      <Header as='h3'>Roadmap</Header>
      <p>This project is probably about as far as it'll ever go, but here were some of the ideas I had in mind.</p>
      <List>
        <List.Item>
          <List.Content>
            <List.Header>Mobile responsiveness</List.Header>
            <List.Description>The app was meant to be used mainly on the desktop, so no attempt at responsiveness has
              been made. It's best viewed at &gt; 1200px wide.</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Portfolio value over time</List.Header>
            <List.Description>Since each iteration of the portfolio is saved, it should be simple to show a graph or
              display of the total value over time.</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Automated updates to portfolio</List.Header>
            <List.Description>While Investopedia doesn't have an open API, there are several wrappers that would allow a
              headless login experience. I envisioned a daily job to go and update
              each user's portfolio, but managing passwords and a server is overkill for this little
              project.</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>In-app trading</List.Header>
            <List.Description>Currently Investopedia runs trades after a ~15 minute wait time. I wanted to add a tracker
              that would let the user know how much time
              was left in their trade and automatically update their portfolio once it had been completed. The user
              would have to manually add the trade here, but
              could click on a link with query params to open up the Investopedia page with pre-filled values.<br/>
              e.g. <code>https://www.investopedia.com/simulator/trade/tradestock.aspx?too=2&Sym=TRVG&Qty=4500</code> would
              sell 4500 shares of Trivago (TRVG).</List.Description>
          </List.Content>
        </List.Item>
      </List>
    </Container>
  );
};
