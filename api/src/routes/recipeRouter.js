const recipeRouter = require("express").Router();
const {
  getAllRecipes,
  getRecipeByName,
  getRecipeById,
  postRecipe,
} = require("../controllers/recipeController");

recipeRouter.get("/", async (req, res) => {
  const { nombre } = req.query;
  if (nombre) {
    const recipe = await getRecipeByName(nombre);
    if (recipe.error) return res.status(404).json(recipe);
    return res.status(200).json(recipe);
  } else {
    const allRecipes = await getAllRecipes();
    return res.status(200).json(allRecipes);
  }
});

recipeRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const recipePorId = await getRecipeById(id);
    if (recipePorId.error) return res.status(400).json(recipePorId);
    else {
      return res.status(200).json(recipePorId);
    }
  } else {
    return res.status(500).send(error.message);
  }
});

recipeRouter.post("/", async (req, res) => {
  const { nombre, imagen, resumen, healthscore, pasos, dietas } = req.body;

  try {
    if (!nombre || !imagen || !resumen || !healthscore || !pasos || !dietas)
      throw Error("Faltan datos...");
    else {
      const newRecipe = await postRecipe(
        nombre,
        imagen,
        resumen,
        healthscore,
        pasos,
        dietas
      );
      return res.status(200).json(newRecipe);
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = recipeRouter;
