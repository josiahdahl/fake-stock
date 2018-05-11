import { combineReducers } from 'redux';
import { search } from './search';
import { stocks } from './stocks';
import { portfolio } from './portfolio';

export const rootReducer = combineReducers({
  search,
  stocks,
  portfolio,
});