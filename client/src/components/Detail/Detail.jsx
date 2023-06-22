import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./Detail.module.css";
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

  const RegExUUID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  let testId = RegExUUID.test(id);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await axios.get(`http://localhost:3001/recipes/${id}`);
      const { data } = response;

      if (testId) {
        try {

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
      } else {
        try {

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
    // La receta proviene de la base de datos
    return (
      <div className={styles.Detail}>
        <img src={recipe.imagen} alt="" />
        <h1>ID: </h1>
        <p>{id}</p>
        <hr />
        <h1>Nombre: </h1>
        <p>{recipe.nombre}</p>
        <hr />
        <h1>Resumen del Plato: </h1>
        <p>{recipe.resumen}</p>
        <hr />
        <h1>Puntuación de Salud: </h1>
        <p>{recipe.healthscore}</p>
        <hr />
        <h1>Paso a Paso: </h1>
        <p>{recipe.pasos}</p>
        <hr />
        <h1>Tipo/s de Dieta: </h1>
        <p>{recipe.dietsId?.map((dieta) => dieta.nombre).join(", ")}</p>
      </div>
    );
  } else {
    // La receta proviene de la API
    return (
      <div className={styles.Detail}>
        <img src={recipeApi.imagen} alt="" />
        <h1>ID: </h1>
        <p>{id}</p>
        <hr />
        <h1>Nombre: </h1>
        <p>{recipeApi.nombre}</p>
        <hr />
        <h1>Resumen del Plato: </h1>
        <p>
          <span dangerouslySetInnerHTML={{ __html: recipeApi.resumen }}></span>
        </p>
        <hr />
        <h1>Puntuación de Salud: </h1>
        <p>{recipeApi.healthscore}</p>
        <hr />
        <h1>Paso a Paso:</h1>
        {recipeApi.pasos?.map((paso, index) => (
          <li key={index}>
            <h3>Paso {paso.number}</h3>
            <p>{paso.step}</p>
          </li>
        ))}
        <hr />
        <h1>Tipo/s de Dieta: </h1>
        <p>{recipeApi.dietas?.join(", ")}</p>
      </div>
    );
  }
};

export default Detail;
