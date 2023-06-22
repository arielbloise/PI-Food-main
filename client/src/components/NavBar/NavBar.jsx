import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";

const NavBar = ({ onSearch }) => {
  const handleHomeClick = () => {
    window.location.reload();
  };

  return (
    <div className={style.NavBar}>
      <div className={style.NavLinks}>
        <button onClick={handleHomeClick}>&#x1F504;</button>
        <NavLink to="/form">
          <button>CARGAR RECETA</button>
        </NavLink>
      </div>

      <SearchBar onSearch={onSearch} />
    </div>
  );
};

export default NavBar;