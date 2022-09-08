const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const { capitalizeString } = require('../routes/Race/functions');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('race', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        set(value) {
          this.setDataValue('name', capitalizeString(value)) //function
        }
    },
    height:{
        type: DataTypes.STRING,
        allowNull: false
    },
    weight:{
        type: DataTypes.STRING,
        allowNull: false
    },
    life_span: {
        type: DataTypes.STRING,
        defaultValue: 'null life_span'
    }, 
  }, {
        timestamps: false
    });
};

