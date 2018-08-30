# Fake Stock

[Demo Site](https://fake-stock.netlify.com)

## Genesis
In March of 2018 some friends and I started an investing competition through Investopedia. The UI wasn't the greatest, so I wanted to make something to get prices faster without having to refresh as well as search for stocks. Over time the allure wore off and I stopped playing, but I still think it's a cool project to share.

## Tech
Fake Stock is built with:

* React/Redux (Create React App base)
* Semantic UI React
* IEX Developer Platform (stocks)
* A bleeding edge, disruptive algorithm for parsing data (aka regexes, maps, filters, and reduces)
* GitHub pages with CI/CD through Circle CI

## Roadmap
This project is probably about as far as it'll ever go, but here were some of the ideas I had in mind.

#### Mobile responsiveness
The app was meant to be used mainly on the desktop, so no attempt at responsiveness has been made. It's best viewed at > 1200px wide.
#### Portfolio value over time
Since each iteration of the portfolio is saved, it should be simple to show a graph or display of the total value over time.
#### Automated updates to portfolio
While Investopedia doesn't have an open API, there are several wrappers that would allow a headless login experience. I envisioned a daily job to go and update each user's portfolio, but managing passwords and a server is overkill for this little project.
#### In-app trading
Currently Investopedia runs trades after a ~15 minute wait time. I wanted to add a tracker that would let the user know how much time was left in their trade and automatically update their portfolio once it had been completed. The user would have to manually add the trade here, but could click on a link with query params to open up the Investopedia page with pre-filled values.
e.g. https://www.investopedia.com/simulator/trade/tradestock.aspx?too=2&Sym=TRVG&Qty=4500 would sell 4500 shares of Trivago (TRVG).

## Local Development
1. `git clone git@github.com:josiahdahl/fake-stock.git`
1. `cd fake-stock && yarn install`
1. `yarn start`