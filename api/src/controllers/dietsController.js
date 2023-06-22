const axios = require("axios");
const { Diets } = require("../db"); 
const { API_KEY } = process.env;


const preCargaDietas = async () => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`
    );

    const dataAPI = response.data.results;

    const dietsSet = new Set();
    dataAPI.forEach((recipe) => {
      recipe.diets.forEach((diet) => dietsSet.add(diet));
      if (recipe.vegetarian) {
        dietsSet.add("vegetarian");
      }
      if (recipe.vegan) {
        dietsSet.add("vegan");
      }
      if (recipe.glutenFree) {
        dietsSet.add("glutenFree");
      }
    });

    const diets = Array.from(dietsSet);
    await Diets.bulkCreate(diets.map((nombre) => ({ nombre })));
    console.log("Dietas precargadas en la base de datos.");
  } catch (error) {
    console.error("Error al precargar las dietas:", error.message);
  }
};

const getAllDiets = async () => await Diets.findAll();

const getDietsByName = async (nombre) => {
  const dietsFitrada = await Diets.findOne({ where: { nombre } });

  if (dietsFitrada) return dietsFitrada;
  return { error: `No existe la dieta: ${nombre}` };
};

module.exports = { preCargaDietas, getAllDiets, getDietsByName };
