import { combineReducers } from 'redux';
import { search } from './search';
import { stocks } from './stocks';

export const rootReducer = combineReducers({
  search,
  stocks,
});