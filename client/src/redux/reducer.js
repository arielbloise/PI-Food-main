import {
  FILTER_BY_DIET,
  FILTER_BY_SOURCE,
  SORT_BY_ALPHABETICAL_ORDER,
  SORT_BY_HEALTH_SCORE,
  GET_RECIPES_DB,
  GET_RECIPES_API,
} from "./actionType";

const initialState = {
  recipesDB: [],
  recipesAPI: [],
  dietFilter: null,
  sourceFilter: {},
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
    case GET_RECIPES_DB:
      return { ...state, recipesDB: action.payload };
    case GET_RECIPES_API:
      return { ...state, recipesAPI: action.payload };
    default:
      return { ...state };
  }
};

export default reducer;
