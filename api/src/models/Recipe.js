const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resumen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    healthscore: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pasos: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: false
  });
};
