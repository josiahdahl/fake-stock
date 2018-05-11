import { connect } from 'react-redux';
import { RecentItems } from '../components/RecentItems';

const mapStateToProps = state => ({
  companies: state.search.history.map(symbol => state.stocks.entities[symbol]),
});

export const RecentItemsList = connect(
  mapStateToProps,
)(RecentItems);