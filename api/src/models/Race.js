const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
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
          this.setDataValue('name', value.toLowerCase().split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')) 
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
        defaultValue: ' ∞ '
    },
    image:{
      type: DataTypes.TEXT,
      defaultValue: 'https://cloudfront-us-east-1.images.arcpublishing.com/eluniverso/EDF3KKJZQBFP5EYYTL6GJPRVZ4.jpg'
    },  
  }, {
        timestamps: false
    });
};

