import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware,
  )
);