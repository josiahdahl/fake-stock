import { connect } from 'react-redux';
import { RecentItems } from '../components/RecentItems';

const mapStateToProps = state => ({
  companies: state.search.history,
});

export const RecentItemsList = connect(
  mapStateToProps,
)(RecentItems);