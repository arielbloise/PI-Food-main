const validate = (form1) => {
    let errors = {};
  
    // Verificar campo 'nombre'
    if (!form1.nombre.trim()) {
      errors.nombre = 'El nombre es obligatorio.';
    }
  
    // Verificar campo 'resumen'
    if (!form1.resumen.trim()) {
      errors.resumen = 'El resumen es obligatorio.';
    }
  
    // Verificar campo 'healthscore'
    const healthscore = Number(form1.healthscore);
    if (isNaN(healthscore) || healthscore < 0 || healthscore > 100) {
      errors.healthscore = 'El healthscore debe ser un número válido entre 0 y 100.';
    }
  
    // Verificar campo 'pasos'
    if (!form1.pasos.trim()) {
      errors.pasos = 'Los pasos son obligatorios.';
    }
  
    // Verificar campo 'dietas'
    if (!Array.isArray(form1.dietas) || form1.dietas.length === 0) {
      errors.dietas = 'Debe seleccionar al menos una dieta.';
    }
  
    return errors;
  };


  export default validate