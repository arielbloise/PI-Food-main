const dietsRouter = require('express').Router();
const { Diets } = require('../db');
const {
 preCargaDietas,   
 getAllDiets,
 getDietsByName
 } = require ('../controllers/dietsController');

const CargaDietas = async () => {
    const dietasCuenta = await Diets.count();
    if (dietasCuenta === 0) {
      await preCargaDietas();
    }
};  

CargaDietas();
 
dietsRouter.get('/', async (req, res) => {
    const { nombre } = req.query;

    if(nombre) {
        const diets = await getDietsByName(nombre);
        if(diets.error) return res.status(404).json(diets);
        return res.status(200).json(diets);
    } else {
        const allDiets = await getAllDiets();
        return res.status(200).json(allDiets);
    }

});

module.exports = dietsRouter;