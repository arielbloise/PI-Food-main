import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Form.module.css";
import validate from "../../validation";

const Form = () => {
  const [form1, setForm1] = useState({
    nombre: "",
    resumen: "",
    healthscore: 0,
    pasos: "",
    imagen: "",
    dietas: [],
  });

  const [dietasOptions, setDietasOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/diets")
      .then((response) => {
        setDietasOptions(response.data);
      })
      .catch((error) => {
        console.log("Error en la solicitud GET:", error);
      });
  }, []);

  const validateForm = () => {
    const validationErrors = validate(form1);
    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  };

  const handleForm1Change = (event) => {
    if (event.target.name === "dietas") {
      const selectedOptions = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
      setForm1({
        ...form1,
        [event.target.name]: selectedOptions,
      });
    } else {
      setForm1({
        ...form1,
        [event.target.name]: event.target.value,
      });
    }
    validateForm();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      try {
        const response = await axios.post(
          "http://localhost:3001/recipes",
          form1
        );
        if (response.status === 200) {
          alert("Receta Cargada Correctamente!");
          setForm1({
            nombre: "",
            resumen: "",
            healthscore: 0,
            pasos: "",
            imagen: "",
            dietas: [],
          });
          setErrors({});
        }
      } catch (error) {
        alert("Error al cargar la receta", error);
      }
    }
  };

  return (
    <div className={styles.formMax}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <h1 className={styles.formTitle}>Carga Aquí Tus Recetas</h1>

          <div className={styles.formGroup}>
            <label htmlFor="nombre" className={styles.formLabel}>
              Nombre:
            </label>
            <input
              value={form1.nombre}
              type="text"
              name="nombre"
              className={styles.formInput}
              onChange={handleForm1Change}
            />
            {errors.nombre && <p className={styles.error}>{errors.nombre}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="resumen" className={styles.formLabel}>
              Resumen:
            </label>
            <textarea
              value={form1.resumen}
              name="resumen"
              className={styles.formTextarea}
              onChange={handleForm1Change}
            />
            {errors.resumen && <p className={styles.error}>{errors.resumen}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="healthscore" className={styles.formLabel}>
              Health Score:
            </label>
            <input
              value={form1.healthscore}
              type="number"
              name="healthscore"
              className={styles.formInput}
              onChange={handleForm1Change}
            />
            {errors.healthscore && (
              <p className={styles.error}>{errors.healthscore}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="pasos" className={styles.formLabel}>
              Pasos:
            </label>
            <textarea
              value={form1.pasos}
              name="pasos"
              className={styles.formTextarea}
              onChange={handleForm1Change}
            />
            {errors.pasos && <p className={styles.error}>{errors.pasos}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="imagen" className={styles.formLabel}>
              Imagen URL:
            </label>
            <input
              value={form1.imagen}
              type="text"
              name="imagen"
              className={styles.formInput}
              onChange={handleForm1Change}
            />
            {errors.imagen && <p className={styles.error}>{errors.imagen}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dietas" className={styles.formLabel}>
              Dietas:
            </label>
            <div className={styles.selectContainer}>
              <select
                name="dietas"
                className={styles.formSelect}
                multiple
                onChange={handleForm1Change}
              >
                {dietasOptions.map((dieta) => (
                  <option key={dieta.id} value={dieta.id}>
                    {dieta.nombre}
                  </option>
                ))}
              </select>
              <div className={styles.selectedOptions}>
                {form1.dietas.map((dietaId, index) => {
                  const dieta = dietasOptions.find(
                    (item) => item.id === dietaId
                  );
                  return (
                    <span key={dieta.id}>
                      {dieta.nombre}
                      {index < form1.dietas.length - 1 && (
                        <span className={styles.separator}> - </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
            {errors.dietas && <p className={styles.error}>{errors.dietas}</p>}
          </div>

          <button
            type="submit"
            className={styles.formButton}
            disabled={!isFormValid}
          >
            CARGAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
