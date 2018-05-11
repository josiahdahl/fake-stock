import React, { Component } from 'react';
import { Form, GridColumn, GridRow, List, ListItem } from 'semantic-ui-react';
import { connect } from 'react-redux';

class AddStocksFormComponent extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    rawStocks: '',
    result: [],
  };

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const result = this.parseStocks(this.state.rawStocks);
    this.setState({
      result,
    });
  };

  parseStocks(text) {
    const re = new RegExp(/^(\w+)\D+(\d+)\s\$(\d+\.\d+)/);

    return text.split('\n')
      .map(line => line.replace(/^Sell\s+/g, ''))
      .map(line => line.replace(/\s+/g, ' '))
      .map(line => line.trim())
      .filter(line => !line.startsWith('SYMBOL'))
      .filter(line => re.test(line))
      .reduce((stocks, stock) => {
        const [/**/, symbol, quantity, purchasePrice] = stock.match(re);
        return [
          ...stocks,
          {
            symbol,
            quantity,
            purchasePrice,
          },
        ];
      }, []);
  }

  render() {
    const { rawStocks, result } = this.state;
    const formattedResult = result.map(r => <ListItem header={r.symbol}
                                                      description={`${r.quantity} @ $${r.purchasePrice}`}/>);
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <GridRow>
            <GridColumn>
              <Form.TextArea label="Stocks Table" name="rawStocks" value={rawStocks}
                             onChange={this.handleChange}/>
            </GridColumn>
            <GridColumn>
              <List content={formattedResult}/>
            </GridColumn>
          </GridRow>
          <GridRow>
            <Form.Button content="Submit"/>
          </GridRow>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

export const AddStocksForm = connect(

)(AddStocksFormComponent);