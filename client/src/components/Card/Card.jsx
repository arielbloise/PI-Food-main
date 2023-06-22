import style from './Card.module.css'
import { NavLink } from 'react-router-dom';
import React from 'react';

const Card = ({id, nombre, imagen, dieta}) =>{

    const capitalize = (str) => {
        if (!str) return "";
        return str
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      };


return(
    <NavLink to={`/detail/${id}`} className={style.cardLink}>
    <div className={style.cardContainer}>
        <h1>{nombre}</h1>
        <p>
          <span className={style.dietasLabel}>Dietas: </span>
          {capitalize(dieta)}
        </p>
        <div className={style.cardImage}>
            <img src={imagen} alt={nombre} />

             </div>

    </div>
    </NavLink>
)
}

export default Card;