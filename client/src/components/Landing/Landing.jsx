import { NavLink } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.Landing}>
      <h1>BIENVENIDOS A LA APP DE FOODS</h1>
      <h2>CREADA POR ARIEL BLOISE</h2>
      <h2>COHORTE FT 38a</h2>

      <NavLink to="/home">
        <button>HOME</button>
      </NavLink>
    </div>
  );
};

export default Landing;
