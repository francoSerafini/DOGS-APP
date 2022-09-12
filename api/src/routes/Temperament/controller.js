require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Temperament } = require('../../db');

const createTemperaments = async function() {
    const allTemperaments =  await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then(response => response.data)
    .then(data => {
        let temperaments = new Set();
        for(let i = 0; i < data.length; i++) {
            if(data[i].temperament) {
                let array = data[i].temperament.split(', ');
                array.map(temp => temperaments.add(temp));                };
            };
        return temperaments;    
    });
    if (await Temperament.count() === 0) await Array.from(allTemperaments).map(temp => Temperament.create({ name: temp })); 
        return Array.from(allTemperaments);
};


const getAllTemperaments =  async (req, res) => {
    try {
        const temperaments = await createTemperaments();
        res.status(200);
        res.send(temperaments);
    } catch(err) {
        res.status(500).send(err.message)
    }    
};
   

module.exports = { getAllTemperaments, createTemperaments };