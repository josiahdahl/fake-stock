import { IMPORT_PORTFOLIO } from '../actions/portfolio';

const initialState = {
  currentId: null,
  ids: [/* uuid, */],
  entities: {
    /*
    uuid: {
      id (uuid)
      date,
      stocks: [{
        symbol,
        amountOwned,
        purchasePrice,
      }]
    }
     */
  },
};

export const portfolio = (state = initialState, action) => {
  switch (action.type) {
    case IMPORT_PORTFOLIO: {
      const {id} = action.portfolio;
      return {
        currentId: id,
        ids: [id, ...state.ids],
        entities: {
          ...state.entities,
          [id]: action.portfolio,
        }
      }
    }
    default:
      return state;
  }
};