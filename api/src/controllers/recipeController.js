const { Op } = require("sequelize");
const axios = require('axios');
const { Recipe, Diets, recipe_diets } = require('../db'); //ME TRAIGO EL MODELO DE Recipe
const { getDietsByName } = require ('./dietsController'); 
const { API_KEY} = process.env

  const getAllRecipes = async () => {
    const recipesTodoDB = await Recipe.findAll();
    const recipeIds = recipesTodoDB.map((recipe) => recipe.id);
    

    const recipedietsTodoDB = await Promise.all(recipeIds.map((i) => getRecipeById(i)));
    

    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`);
    const recipesTodoAPI = response.data.results;

    if (recipedietsTodoDB.length > 0 || recipesTodoAPI.length > 0) {
      const recipesTODAS = [...recipedietsTodoDB, ...recipesTodoAPI];
      return recipesTODAS;
    }          
  }

  const buscarRecipesApi = async (nombre) => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`);
      const results = response.data.results;
      
      const filteredResults = results.filter((recipe) => recipe.title.toLowerCase().includes(nombre.toLowerCase()));
  
      return filteredResults;
    } catch (error) {
      throw new Error('Error al buscar recetas en la API de Spoonacular');
    }
  };
  
  

const getRecipeByName = async (nombre) => {
    const recipeFiltradaDB = await Recipe.findAll(
        { where: { nombre: { [Op.iLike]: `%${nombre}%` } } });
    const recipeFiltradaApi = await buscarRecipesApi(nombre);
        if (recipeFiltradaDB.length > 0 || recipeFiltradaApi.length > 0) {
            const recipes = [...recipeFiltradaDB, ...recipeFiltradaApi];
            return recipes;
          }
          return { error: `No existen recetas con el nombre: ${nombre}` };
};


const getRecipeById = async (id) => {
    
    const RegExUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i; //EXPRESION REGULAR PARA UUID

    if(RegExUUID.test(id)){
      const recetaId = await Recipe.findByPk(id);
      const dietsIdFk = await recipe_diets.findOne({where: {recipeId: id}});
      //console.log(dietsIdFk);
      if(!dietsIdFk) {
        return {error: `No existe dieta asociada a la receta con ID: ${id}`};  
      } else {
        const dietsId = await Diets.findByPk(dietsIdFk.dietId); //console.log(dietsId);
          
        const concatenatedObject = {
            recetaId: recetaId,
            dietsId: dietsId,
        };

      return concatenatedObject;
      }

    }else {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)

            //const recetaId = response.data;
            const recetaId = {
                id: response.data.id,
                nombre: response.data.title,
                imagen: response.data.image,
                resumen: response.data.summary,
                heathscore: response.data.healthScore,
                pasos: response.data.analyzedInstructions[0].steps,
                dietas: response.data.diets
              };           
            
            return recetaId;
            
        } catch (error) {
           return {error: `No existe la receta con ID: ${id}`};
        }
    }
            
}; 
  

const postRecipe = async (nombre, imagen, resumen, healthscore, pasos, dietas) => {
    const [newRecipe, created] = await Recipe.findOrCreate(
        {where: {nombre, imagen, resumen, healthscore, pasos}}
    );

    const dietsForRecipe = await getDietsByName(dietas);
    //console.log(dietsForRecipe);

    if (!dietsForRecipe || !dietsForRecipe.id) {
        throw new Error("No se encontró el ID de la dieta");
      }
    

    const [newRecipeDietas, createdDietas] = await recipe_diets.findOrCreate(
        {where: {recipeId: newRecipe.id, dietId: dietsForRecipe.id}}
    );

    return newRecipe[0];

};

module.exports = { 
    getAllRecipes,
    getRecipeByName,
    getRecipeById,
    postRecipe
};