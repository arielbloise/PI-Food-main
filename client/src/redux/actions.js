import {FILTER_BY_DIET , FILTER_BY_SOURCE , SORT_BY_ALPHABETICAL_ORDER , SORT_BY_HEALTH_SCORE} from './actionType'


export const filterByDiet = (dietType) => {
    return { type: FILTER_BY_DIET, payload: dietType };
  };
  
  export const filterBySource = (sourceType) => {
    return { type: FILTER_BY_SOURCE, payload: sourceType };
  };
  
  export const sortByAlphabeticalOrder = (order) => {
    return { type: SORT_BY_ALPHABETICAL_ORDER, payload: order };
  };
  
  export const sortByHealthScore = (order) => {
    return { type: SORT_BY_HEALTH_SCORE, payload: order };
  };