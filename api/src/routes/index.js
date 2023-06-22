const { Router } = require("express");

const dietsRouter = require("./dietsRouter");
const recipeRouter = require("./recipeRouter");

const router = Router();

router.use("/diets", dietsRouter);
router.use("/recipes", recipeRouter);

module.exports = router;
