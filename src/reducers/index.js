import { combineReducers } from 'redux';
import { search } from './search';
import { stocks } from './stocks';
import { portfolio } from './portfolio';
import { charts } from './charts';

export const rootReducer = combineReducers({
  search,
  stocks,
  portfolio,
  charts,
});