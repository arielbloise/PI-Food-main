import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import styles from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterByDiet, filterBySource, sortByAlphabeticalOrder, sortByHealthScore } from '../../redux/actions';
import { connect } from 'react-redux';

const Home = ({ recipes, onSearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;
  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const dispatch = useDispatch();
  const { dietFilter, sourceFilter, alphabeticalOrder, healthScoreOrder } = useSelector(state => state);

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


const handleFilterByDiet = (dietType) => {
  dispatch(filterByDiet(dietType.target.value));
};

const handleFilterBySource = (e) => {
    dispatch(filterBySource(e.target.value));
  };

  const handleSortByAlphabeticalOrder = (order) => {
    dispatch(sortByAlphabeticalOrder(order));
  };

  const handleSortByHealthScore = (order) => {
    dispatch(sortByHealthScore(order));
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.filtersSortingContainer}>
        <div className={styles.filtersContainer}>
          <div>
            <label htmlFor="dietFilter">Filtrar por tipo de dieta:</label>
            <select
              id="dietFilter"
              value={dietFilter}
              onChange={(e) => handleFilterByDiet(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Ketogenic">Ketogenic</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              
            </select>
          </div>
          <div>
            <label htmlFor="sourceFilter">Filtrar por origen:</label>
            <select
              id="sourceFilter"
              value={sourceFilter}
              onChange={(e) => handleFilterBySource(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="API">API</option>
              <option value="Base de datos">Base de datos</option>
              {/* Agrega más opciones según tus necesidades */}
            </select>
          </div>
        </div>

        <div className={styles.sortingOptions}>
          <div>
            <label htmlFor="alphabeticalOrder">Ordenar alfabéticamente:</label>
            <select
              id="alphabeticalOrder"
              value={alphabeticalOrder}
              onChange={(e) => handleSortByAlphabeticalOrder(e.target.value)}
            >
              <option value="">Ninguno</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
          <div>
            <label htmlFor="healthScoreOrder">Ordenar por "comida saludable":</label>
            <select
              id="healthScoreOrder"
              value={healthScoreOrder}
              onChange={(e) => handleSortByHealthScore(e.target.value)}
            >
              <option value="">Ninguno</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        {currentRecipes.map((recipe) => {
         
          let nombre = ""
        if(recipe.recetaId){
            nombre = recipe.recetaId.nombre
        } else if (recipe.nombre){
            nombre = recipe.nombre
        } else{
            nombre = recipe.title
        }
    
          let image = ""
          if(recipe.recetaId){
              image = recipe.recetaId.imagen
          } else if (recipe.imagen){
              image = recipe.imagen
          } else{
              image = recipe.image
          }
         
       
          let dieta = []
          if(recipe.dietsId){
            dieta = recipe.dietsId.map((dieta) => dieta.nombre).join(" - ");
          } else{
              dieta = recipe.diets?.join(" - ");
          }
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


const mapStateToProps = () =>{

}

const mapDispatchToProps = () =>{

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);