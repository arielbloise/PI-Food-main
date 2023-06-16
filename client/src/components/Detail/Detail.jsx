import axios from "axios";
import { useState, useEffect } from "react";
import styles from './Detail.module.css'
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [diets, setDiets] = useState({});

  //console.log(id)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/${id}`);
        const { data } = response;
 //       console.log(data);
 if (data && data.recetaId) {
    setRecipe(data.recetaId);
  } else {
    alert("¡No hay recetas con este ID!");
  }
  if (data && data.dietsId) {
    setDiets(data.dietsId.nombre);
  } else {
    alert("¡No hay dietas con este ID!");
  }  
      } catch (error) {
        console.log(error);
      }
      
    };


    fetchRecipe();
  }, [id]);

  const { nombre, imagen, healthscore, resumen, pasos } = recipe; 
 const w = diets;
console.log(recipe)
console.log(diets)
  return (
    <div className={styles.Detail}>
        <img src={imagen} alt="" />
        <h1>ID: {id}</h1>
        <h1>Nombre: {nombre}</h1>
        <h1>Resumen del Plato: {resumen}</h1>
        <h1>Puntuación de Salud: {healthscore}</h1>
        <h1>Paso a Paso: {pasos}</h1>
        <h1>Tipo/s de Dieta: {w}</h1>
 {/*
 
    <img src={imagen} alt="" />
    <h1>ID: {id}</h1>
    <h1>Nombre: {nombre}</h1>
    <h1>Resumen del Plato: {resumen}</h1>
    <h1>Puntuación de Salud: {healthscore}</h1>
    <h1>Paso a Paso:</h1>
    <ul>
      {pasos.map((step, index) => (
        <li key={index}>
          {step.number}: {step.step}
        </li>
      ))}
    </ul>
    <h1>Tipo/s de Dieta: {dietas}</h1>
 
 */}
  </div>
       
  );
};

export default Detail;
          