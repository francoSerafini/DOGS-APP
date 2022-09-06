const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('raza', {
    id: {
      type: DataTypes.INTEGER,
      auntoIncrement: true,
      primaryKey: true,
      unique: true,
      set(value) {
        this.setDataValue('id', value + 'db')
      }
    },
    nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        set(value) {
          this.setDataValue('nombre', value.toUpperCase())
        }
    },
    altura:{
        type: DataTypes.STRING,
        allowNull: false
    },
    peso:{
        type: DataTypes.STRING,
        allowNull: false
    },
    anios: {
        type: DataTypes.STRING
    }, 
  }, {
        timestamps: false
    });
};