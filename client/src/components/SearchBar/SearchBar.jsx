import React, { useState } from "react";
import style from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSearch = () => {
    if (!name) {
      alert("DEBE INGRESAR POR LO MENOS 1 CARACTER");
    } else {
      onSearch(name);
    }
  };

  return (
    <div className={style.contenedor}>
      <div className={style.inputContainer}>
        <input
          type="search"
          onChange={handleChange}
          value={name}
          className={style.input}
          placeholder="Buscar Receta"
        />
        <button onClick={handleSearch} className={style.searchButton}>
          <span className={style.searchIcon}></span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
