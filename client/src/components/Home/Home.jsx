import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByDiet,
  filterBySource,
  sortByAlphabeticalOrder,
  sortByHealthScore,
  getAllRecipes,
} from "../../redux/actions";

const Home = ({ recipes }) => {
  const [dietasOptions, setDietasOptions] = useState([]);

  const dispatch = useDispatch();

  const {
    dietFilter,
    sourceFilter,
    alphabeticalOrder,
    healthScoreOrder,
    recipesDB,
    recipesAPI,
  } = useSelector((state) => state);

  useEffect(() => {
    axios.get("http://localhost:3001/diets").then((response) => {
      setDietasOptions(response.data);
    });
    dispatch(getAllRecipes());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;

  let filteredRecipes = [];
  if (!recipes || recipes.length === 0) {
    filteredRecipes = recipesDB.concat(recipesAPI);
  } else {
    filteredRecipes = recipes;
  }
  filteredRecipes = filteredRecipes
    .filter((recipe) => {
      if (dietFilter && dietFilter !== "") {
        if (recipe.diets && recipe.diets.length > 0) {
          return recipe.diets.some((diet) => diet === dietFilter);
        } else if (recipe.dietsId && recipe.dietsId.length > 0) {
          return recipe.dietsId.some((diet) => diet.nombre === dietFilter);
        }
      }
      return true;
    })
    .filter((recipe) => {
 
      if (sourceFilter === "API") {
        return recipe.hasOwnProperty("id");
      } else if (sourceFilter === "DB") {
        return recipe.hasOwnProperty("recetaId");
      }
      return true;
    })
    .sort((a, b) => {
      const x1 = a.title || a.recetaId.nombre;
      const x2 = b.title || b.recetaId.nombre;
      if (alphabeticalOrder === "asc") {
        return x1.localeCompare(x2);
      } else if (alphabeticalOrder === "desc") {
        return x2.localeCompare(x1);
      }
      return 0;
    })
    .sort((a, b) => {
      if (healthScoreOrder === "asc") {
        return a.healthScore - b.healthScore;
      } else if (healthScoreOrder === "desc") {
        return b.healthScore - a.healthScore;
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );


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
          className={currentPage === i ? styles.active : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handleFilterByDiet = (dietType) => {
    dispatch(filterByDiet(dietType));
  };

  const handleFilterBySource = (value) => {
    dispatch(filterBySource(value));
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
              {dietasOptions.map((dieta) => (
                <option key={dieta.id} value={dieta.nombre}>
                  {dieta.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sourceFilter">Filtrar por origen:</label>
            <select
              id="sourceFilter"
              value={sourceFilter}
              onChange={(e) => handleFilterBySource(e.target.value)}
            >
              <option value="TODOS">Todos</option>
              <option value="API">API</option>
              <option value="DB">Base de datos</option>
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
            <label htmlFor="healthScoreOrder">
              Ordenar por "comida saludable":
            </label>
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
        {currentRecipes.map((recipe) => (
          <Card
            key={recipe.id || recipe.recetaId.id}
            id={recipe.id || recipe.recetaId.id}
            nombre={recipe.title || recipe.recetaId.nombre}
            imagen={recipe.image || recipe.recetaId.imagen}
            dieta={
              recipe.diets?.join(" - ") ||
              recipe.dietsId?.map((dieta) => dieta.nombre).join(" - ")
            }
          />
        ))}
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
