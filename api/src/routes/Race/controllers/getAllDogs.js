require('dotenv').config();
const { API_KEY } = process.env;
const { apiAllDogs } = require('../auxFunctions/apiAllDogs');
const { dbAllDogs } = require('../auxFunctions/dbAllDogs');

const getAllDogs = async (req, res) => {
    let race = req.query.name;
    let allRaces = [];
    if (race) {
        race = race.toLowerCase().split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
        try {
            allRaces = allRaces.concat(await apiAllDogs(`https://api.thedogapi.com/v1/breeds/search?q=${race}&api_key=${API_KEY}`));
            let allRacesDb = await dbAllDogsByFilter(race);
            allRaces = allRaces.concat(allRacesDb);
            let notFound = [{
                id: 'notFound',
                name: 'There is no race that contains ' + race,
                image: 'https://c8.alamy.com/compes/2ejmtjf/la-persona-con-cabeza-de-perro-esta-consusa-sobre-algo-concepto-de-consusion-2ejmtjf.jpg'
            }]
            if (allRaces.length === 0) return res.send(notFound);
            res.status(200);
            res.send(allRaces);
        }
        catch (err) {
            res.status(500);
            res.send(err.message);
        }
    }
    else {
        try {
            allRaces = allRaces.concat(await apiAllDogs(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`));
            let allRacesDb = await dbAllDogs();
            allRaces = allRaces.concat(allRacesDb);
            res.status(200);
            res.send(allRaces);
        }
        catch (err) {
            res.status(500);
            res.send(err.message);
        }
    }
};

module.exports = { getAllDogs };