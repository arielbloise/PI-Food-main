import axios from "axios";
import { useState, useEffect } from "react";
import styles from './Detail.module.css'
import { useParams } from "react-router-dom";
import React from "react";

const Detail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    recetaId: {
      nombre: "",
      imagen: "",
      resumen: "",
      healthscore: 0,
      pasos: "",
    },
    dietsId: [],
  });
  const [recipeApi, setRecipeApi] = useState({});


const RegExUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i; //EXPRESION REGULAR PARA UUID
 let testId = RegExUUID.test(id)

  useEffect(() => {
    const fetchRecipe = async () => {
    const response = await axios.get(`http://localhost:3001/recipes/${id}`);
    const { data } = response;

    if(testId){
        try {
            console.log(data);
            if (data.recetaId) {
                setRecipe(data.recetaId);
            } else {
                alert("¡No hay recetas con este ID!");
            }
            if (data.dietsId) {
                setRecipe((prevRecipe) => ({
                  ...prevRecipe,
                  dietsId: data.dietsId,
                }));
            } else {
                alert("¡No hay dietas con este ID!");
            }
        } catch (error) {
            console.log(error);
        }
    } else{
        try {
        console.log(data);
            if (data) {
                setRecipeApi(data);
            } else {
                alert("¡No hay recetas con este ID!");
            }
        } catch (error) {
            console.log(error);
        }
    }
    };

    fetchRecipe();
  }, [id]);





  if (testId) {
    console.log(recipe)
    // La receta proviene de la base de datos
    return (
      <div className={styles.Detail}>
        <img src={recipe.imagen} alt="" />
        <h1>ID: {id}</h1>
        <h1>Nombre: {recipe.nombre}</h1>
        <h1>Resumen del Plato: {recipe.resumen}</h1>
        <h1>Puntuación de Salud: {recipe.healthscore}</h1>
        <h1>Paso a Paso: {recipe.pasos}</h1>
        <h1>Tipo/s de Dieta: {recipe.dietsId?.map((dieta) => dieta.nombre).join(", ")}</h1>
      </div>
    );
  } else {
    // La receta proviene de la API
    return (
       <div className={styles.Detail}>
        <img src={recipeApi.imagen} alt="" />
         <h1>ID: {id}</h1>
        <h1>Nombre: {recipeApi.nombre}</h1>
        <h1>Resumen del Plato: <span dangerouslySetInnerHTML={{ __html: recipeApi.resumen }}></span></h1>
        <h1>Puntuación de Salud: {recipeApi.healthscore}</h1>
        <h1>Paso a Paso:</h1>      
        {recipeApi.pasos?.map((paso, index) => (
            <li key={index}>
              <h3>Paso {paso.number}</h3>
              <h3>{paso.step}</h3>
            </li>
          ))}
          <h1>Tipo/s de Dieta: {recipeApi.dietas?.join(", ")}</h1>
       </div>
    );
  }
};

export default Detail;


