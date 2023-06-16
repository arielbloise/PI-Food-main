import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import styles from './Home.module.css';

const Home = ({ recipes, onSearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;
  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  useEffect(() => {
    onSearch('');
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? styles.active : ''}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.cardsContainer}>
        {currentRecipes.map((recipe) => {
        const nombre = recipe.recetaId ? recipe.recetaId.nombre : recipe.title;
        const image = recipe.recetaId ? recipe.recetaId.imagen : recipe.image;
        const dieta = recipe.dietsId ? recipe.dietsId.nombre : recipe.diets;
        const id = recipe.recetaId ? recipe.recetaId.id : recipe.id;

          return (
            <Card key={id} id={id} nombre={nombre} imagen={image} dieta={dieta} />
          );
        })}
      </div>

      <div className={styles.pagination}>
        <button className="arrow" onClick={handlePreviousPage}>
          &#8249; Anterior
        </button>
        {renderPageNumbers()}
        <button className="arrow" onClick={handleNextPage}>
          Siguiente &#8250;
        </button>
      </div>
    </div>
  );
};

export default Home;