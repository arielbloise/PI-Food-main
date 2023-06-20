import style from './Card.module.css'
import { NavLink } from 'react-router-dom';
import React from 'react';

const Card = ({id, nombre, imagen, dieta}) =>{
return(
    <NavLink to={`/detail/${id}`} className={style.cardLink}>
    <div className={style.cardContainer}>
        <h1>{nombre}</h1>
        <p>{dieta}</p>
        <div className={style.cardImage}>
            <img src={imagen} alt={nombre} />

             </div>

    </div>
    </NavLink>
)
}

export default Card;