import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './Form.module.css';
import validate from '../../validation';

const Form = () => {
  const [form1, setForm1] = useState({
    nombre: '',
    resumen: '',
    healthscore: 0,
    pasos: '',
    imagen: '',
    dietas: []
  });

  const [dietasOptions, setDietasOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Realizar la solicitud GET para obtener las dietas
    axios
      .get('http://localhost:3001/diets')
      .then(response => {
        setDietasOptions(response.data);
      })
      .catch(error => {
        console.log('Error en la solicitud GET:', error);
      });
  }, []);

  const validateForm = () => {
    const validationErrors = validate(form1);
    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  };

  const handlerForm1Change = event => {
    if (event.target.name === 'dietas') {
      // Obtener las opciones seleccionadas del select múltiple
      const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
      setForm1({
        ...form1,
        [event.target.name]: selectedOptions
      });
    } else {
      setForm1({
        ...form1,
        [event.target.name]: event.target.value
      });
    }
    validateForm();
  };

  const handlerSubmit = async event => {
    event.preventDefault();
    if (isFormValid) {
      try {
        const response = await axios.post('http://localhost:3001/recipes', form1);
        if (response.status === 200) {
          console.log('Solicitud POST exitosa');
          setForm1({
            nombre: '',
            resumen: '',
            healthscore: 0,
            pasos: '',
            imagen: '',
            dietas: []
          });
          setErrors({});
        }
      } catch (error) {
        console.log('Error en la solicitud POST:', error);
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handlerSubmit}>
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
            onChange={handlerForm1Change}
          />
          {errors.nombre && <p className={styles.error}>{errors.nombre}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="resumen" className={styles.formLabel}>
            Resumen:
          </label>
          <input
            value={form1.resumen}
            type="text"
            name="resumen"
            className={styles.formInput}
            onChange={handlerForm1Change}
          />
          {errors.resumen && <p className={styles.error}>{errors.resumen}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="healthscore" className={styles.formLabel}>
            HealthScore:
          </label>
          <input
            value={form1.healthscore}
            type="number"
            name="healthscore"
            className={styles.formInput}
            onChange={handlerForm1Change}
          />
          {errors.healthscore && <p className={styles.error}>{errors.healthscore}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="pasos" className={styles.formLabel}>
            Pasos:
          </label>
          <textarea
            rows="5"
            cols="33"
            value={form1.pasos}
            type="text"
            name="pasos"
            className={styles.formTextarea}
            onChange={handlerForm1Change}
          />
          {errors.pasos && <p className={styles.error}>{errors.pasos}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imagen" className={styles.formLabel}>
            Imagen:
          </label>
          <input
            value={form1.imagen}
            type="text"
            name="imagen"
            className={styles.formInput}
            onChange={handlerForm1Change}
          />
          {errors.imagen && <p className={styles.error}>{errors.imagen}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dietas" className={styles.formLabel}>
            Dietas:
          </label>
          <select
            value={form1.dietas}
            name="dietas"
            multiple
            className={styles.formSelect}
            onChange={handlerForm1Change}
          >
            {dietasOptions.map(dieta => (
              <option key={dieta.id} value={dieta.id}>
                {dieta.nombre}
              </option>
            ))}
          </select>
          {errors.dietas && <p className={styles.error}>{errors.dietas}</p>}
        </div>

        <button type="submit" className={styles.formButton} disabled={!isFormValid}>
          CARGAR
        </button>
      </form>
    </div>
  );
};

export default Form;