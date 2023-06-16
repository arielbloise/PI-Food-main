import React, { useState } from 'react';
import style from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className={style.contenedor}>
      <input
        type="search"
        onChange={handleChange}
        value={name}
        className={style.input}
      />

      <button onClick={() => { if (!name) {
         alert ('DEBE INGRESAR POR LO MENOS 1 CARACTER')
      } else{
         onSearch(name)
      }
         }} className={style.button}>
        Buscar Receta
      </button>

    </div>
  );
};

export default SearchBar;