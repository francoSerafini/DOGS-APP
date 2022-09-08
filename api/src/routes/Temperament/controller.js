require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Temperament } = require('../../db');

const getAllTemperaments =  async (req, res) => {
    const allTemperaments =  await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        .then(response => response.data)
        .then(data => {
            let temperaments = new Set();
            for(let i = 0; i < data.length; i++) {
                if(data[i].temperament) {
                    let array = data[i].temperament.split(', ');
                    array.map(temp => temperaments.add(temp));
                }
            }
            return temperaments;
    });
    await Array.from(allTemperaments).map(temp => Temperament.create({ name: temp }))
    res.sendStatus(200);
};

module.exports = { getAllTemperaments };