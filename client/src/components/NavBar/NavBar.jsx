import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import navIcon from "../Assets/bigochef.png";
import reloadIcon from "../Assets/reload-icon.png";

const NavBar = ({ onSearch }) => {
  const handleHomeClick = () => {
    window.location.reload();
  };

  return (
    <div className={style.NavBar}>
      <div className={style.NavLinks}>
        <button className={style.reloadIcon} onClick={handleHomeClick}>
          <img src={reloadIcon} alt="" />
        </button>
        <NavLink to="/form">
          <button>CARGAR RECETA</button>
        </NavLink>
        <NavLink to="/home" className={style.navIcon}>
          <img src={navIcon} alt="" />
        </NavLink>
      </div>

      <SearchBar onSearch={onSearch} />
    </div>
  );
};

export default NavBar;
