import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Landing.module.css";
import plateImage from ".././Assets/plato.png";

const Landing = () => {
  return (
    <div className={styles.Landing}>
      <div className={styles.WelcomeBox}>
        <h1 className={styles.AppTitle}>BIENVENIDOS A LA APP DE FOODS</h1>
        <h2 className={styles.Author}>
          CREADA POR{" "}
          <a
            href="https://www.linkedin.com/in/ariel-bloise-7a561a176/"
            className={styles.CustomLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            ARIEL BLOISE
          </a>
        </h2>
      </div>
      <img src={plateImage} alt="Plato" className={styles.PlateImage} />
      <NavLink to="/home" className={styles.HomeButton}>
        INGRESAR
      </NavLink>
    </div>
  );
};

export default Landing;
