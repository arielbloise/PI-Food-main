import {FILTER_BY_DIET , FILTER_BY_SOURCE , SORT_BY_ALPHABETICAL_ORDER , SORT_BY_HEALTH_SCORE} from './actionType'


const initialState = {
  dietFilter: null,
  sourceFilter: null,
  alphabeticalOrder: null,
  healthScoreOrder: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY_DIET:
      return { ...state, dietFilter: action.payload };
    case FILTER_BY_SOURCE:
      return { ...state, sourceFilter: action.payload };
    case SORT_BY_ALPHABETICAL_ORDER:
      return { ...state, alphabeticalOrder: action.payload };
    case SORT_BY_HEALTH_SCORE:
      return { ...state, healthScoreOrder: action.payload };
    default:
      return state;
  }
};

export default reducer;