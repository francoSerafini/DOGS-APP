require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Temperament } = require('../../db');

const createTemperaments = async function() {
    if (await Temperament.count() === 0) {
        const allTemperaments =  await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        .then(response => response.data)
        .then(data => {
            let temperaments = new Set();
            for(let i = 0; i < data.length; i++) {
                if(data[i].temperament) {
                    let array = data[i].temperament.split(', ');
                    array.map(temp => temperaments.add(temp));
                };
            };
            return temperaments;
        });    
        await Array.from(allTemperaments).map(temp => Temperament.create({ name: temp }));
    }
};


const getAllTemperaments =  async (req, res) => {
    try {
        await createTemperaments();
        res.sendStatus(200);
    } catch(err) {
        res.status(500).send('axios')
    }    
};
   

module.exports = { getAllTemperaments, createTemperaments };