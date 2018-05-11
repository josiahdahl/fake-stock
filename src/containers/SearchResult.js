import { connect } from 'react-redux';
import { CompanyProfile } from '../components/CompanyProfile';

const mapStateToProps = state => state.stocks.entities[state.search.current];

export const SearchResult = connect(
  mapStateToProps,
)(CompanyProfile);