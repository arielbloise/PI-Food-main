const validate = (form1) => {
  let errors = {};

  if (!form1.nombre.trim()) {
    errors.nombre = "El nombre es obligatorio.";
  } else if (!/^[a-zA-Z\s]+$/.test(form1.nombre)) {
    errors.nombre = "El nombre solo debe contener letras.";
  }
  

  if (!form1.resumen.trim()) {
    errors.resumen = "El resumen es obligatorio.";
  } else if (form1.resumen.length > 400) {
    errors.resumen = "El resumen debe tener un máximo de 400 caracteres.";
  }

  const healthscore = Number(form1.healthscore);
  if (isNaN(healthscore) || healthscore < 0 || healthscore > 100) {
    errors.healthscore =
      "El healthscore debe ser un número válido entre 0 y 100.";
  }

  if (!form1.pasos.trim()) {
    errors.pasos = "Los pasos son obligatorios.";
  } else if (form1.pasos.length > 5000) {
    errors.pasos = "Los pasos deben tener un máximo de 5000 caracteres.";
  }

  if (!form1.imagen.trim()) {
    errors.imagen = "La imagen es obligatoria.";
  } else if (!/^https?:\/\/\S+$/.test(form1.imagen)) {
    errors.imagen = "La imagen debe ser una URL válida.";
  }

  if (!Array.isArray(form1.dietas) || form1.dietas.length === 0) {
    errors.dietas = "Debe seleccionar al menos una dieta.";
  }

  return errors;
};

export default validate;
