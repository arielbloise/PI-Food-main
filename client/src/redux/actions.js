import {
  FILTER_BY_DIET,
  FILTER_BY_SOURCE,
  SORT_BY_ALPHABETICAL_ORDER,
  SORT_BY_HEALTH_SCORE,
  GET_RECIPES_DB,
  GET_RECIPES_API,
} from "./actionType";

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

export const getRecipesDB = (recipes) => {
  return { type: GET_RECIPES_DB, payload: recipes };
};

export const getRecipesAPI = (recipes) => {
  return { type: GET_RECIPES_API, payload: recipes };
};

export const getAllRecipes = () => {
  return function (dispatch) {
    fetch("http://localhost:3001/recipes")
      .then((response) => response.json())
      .then((data) => {
        const dbRecipes = data.filter((recipe) => recipe.recetaId);
        const apiRecipes = data.filter((recipe) => !recipe.recetaId); 

        dispatch(getRecipesDB(dbRecipes));
        dispatch(getRecipesAPI(apiRecipes));
      });
  };
};
