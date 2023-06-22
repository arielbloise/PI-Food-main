const { Op } = require("sequelize");
const axios = require("axios");
const { Recipe, Diets, recipe_diets } = require("../db"); 
const { getDietsByName } = require("./dietsController");
const { API_KEY } = process.env;

const getAllRecipes = async () => {
  const recipesTodoDB = await Recipe.findAll();
  const recipeIds = recipesTodoDB.map((recipe) => recipe.id);

  const recipedietsTodoDB = await Promise.all(
    recipeIds.map((i) => getRecipeById(i))
  );

  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`
  );
  const recipesTodoAPI = response.data.results;

  if (recipedietsTodoDB.length > 0 || recipesTodoAPI.length > 0) {
    const recipesTODAS = [...recipedietsTodoDB, ...recipesTodoAPI];
    return recipesTODAS;
  }
};

const buscarRecipesApi = async (nombre) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`
    );
    const results = response.data.results;

    const filteredResults = results.filter((recipe) =>
      recipe.title.toLowerCase().includes(nombre.toLowerCase())
    );

    return filteredResults;
  } catch (error) {
    throw new Error("Error al buscar recetas en la API de Spoonacular");
  }
};

const getRecipeByName = async (nombre) => {
  const recipeFiltradaDB = await Recipe.findAll({
    where: { nombre: { [Op.iLike]: `%${nombre}%` } },
  });

  let id_recipe = [];
  recipeFiltradaDB.forEach((recipe) => {
    id_recipe.push(recipe.dataValues.id);
  });

  const dietRecipeFiltradaDB = await Promise.all(
    id_recipe.map((i) => getRecipeById(i))
  );

  const recipeFiltradaApi = await buscarRecipesApi(nombre);
  if (recipeFiltradaDB.length > 0 || recipeFiltradaApi.length > 0) {
    const recipes = [...dietRecipeFiltradaDB, ...recipeFiltradaApi];
    return recipes;
  }
  return { error: `No existen recetas con el nombre: ${nombre}` };
};

const getRecipeById = async (id) => {
  const RegExUUID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i; 

  if (RegExUUID.test(id)) {
    const recetaId = await Recipe.findByPk(id);
    const dietsForRecipe = await recipe_diets.findAll({
      where: { recipeId: id },
    });

    if (!dietsForRecipe || dietsForRecipe.length === 0) {
      return { error: `No existen dietas asociadas a la receta con ID: ${id}` };
    } else {
      const dietasId = await Promise.all(
        dietsForRecipe.map(async (dietForRecipe) => {
          const diet = await Diets.findByPk(dietForRecipe.dietId);
          return { id: diet.id, nombre: diet.nombre };
        })
      );

      const concatenatedObject = {
        recetaId: recetaId,
        dietsId: dietasId,
      };

      return concatenatedObject;
    }
  } else {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );


      const recetaId = {
        id: response.data.id,
        nombre: response.data.title,
        imagen: response.data.image,
        resumen: response.data.summary,
        healthscore: response.data.healthScore,
        pasos: response.data.analyzedInstructions[0].steps,
        dietas: response.data.diets,
      };

      return recetaId;
    } catch (error) {
      return { error: `No existe la receta con ID: ${id}` };
    }
  }
};

const postRecipe = async (
  nombre,
  imagen,
  resumen,
  healthscore,
  pasos,
  dietas
) => {
  const [newRecipe, created] = await Recipe.findOrCreate({
    where: { nombre, imagen, resumen, healthscore, pasos },
  });

  const dietasIds = Array.isArray(dietas) ? dietas : [dietas];

  for (const dietaId of dietasIds) {
    const dietForRecipe = await Diets.findByPk(dietaId);

    if (!dietForRecipe) {
      throw new Error(`No se encontró la dieta con el ID: ${dietaId}`);
    }

    await recipe_diets.findOrCreate({
      where: { recipeId: newRecipe.id, dietId: dietForRecipe.id },
    });
  }

  return newRecipe;
};

module.exports = {
  getAllRecipes,
  getRecipeByName,
  getRecipeById,
  postRecipe,
};
