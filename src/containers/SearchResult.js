import { connect } from 'react-redux';
import { CompanyProfile } from '../components/CompanyProfile';

const mapStateToProps = state => state.search.current;

export const SearchResult = connect(
  mapStateToProps,
)(CompanyProfile)