require('dotenv').config();
const { API_KEY } = process.env;
const { Race } = require('../../db');
const { apiFindDogById, dbFindDog, apiAllDogs, dbAllDogsByFilter, dbAllDogs, createTemperaments } = require('./functions')
let cont = 0;

const getDogById = async (req, res) => {
    let id = req.params.idRace;
    let dog;
    try {
        if(!isNaN(id)){  //Si no puede convertir el id lo busca en la API externa
            dog = await apiFindDogById(id);
        }
        else {
            dog = await dbFindDog(id);
            dog ? 
                res.status(200).send(dog) 
                : res.sendStatus(404);
        }
    }     
    catch(err) {
        res.send(err.message);
    };
};



const getAllDogs = async (req, res) => {
    let race = req.query.name;
    let allRaces = [];
    if(race) {
        race = race.toLowerCase();
        try {
            allRaces = allRaces.concat(await apiAllDogs(`https://api.thedogapi.com/v1/breeds/search?q=${race}&api_key=${API_KEY}`));
            let allRacesDb = await dbAllDogsByFilter(race);
            allRaces = allRaces.concat(allRacesDb);
            if (allRaces.length === 0) return res.status(404).send('No existe ninguna raza de perro que incluya los valores ingresado');
            res.status(200);
            res.send(allRaces);
        }
        catch(err) {
            res.status(400);
            res.send(err.message);
        }
    }
    else {
        try {
            allRaces= allRaces.concat(await apiAllDogs(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`));
            let allRacesDb = await dbAllDogs();
            allRaces = allRaces.concat(allRacesDb);
            res.status(200);
            res.send(allRaces);
        }
        catch(err) {
            res.status(400);
            res.send(err.message);
        }
    }
    
};

const postDog = async (req, res) => {
    const { name, height, weight } = req.body;
    req.body.id = cont;
    if(!(name || height || weight)) {
        res.status(404);
        return res.send('Falta enviar datos');
    }
    try {
        await createTemperaments();
        const newRace = await Race.create(req.body);
        await newRace.setTemperaments(req.body.temperament);
        cont++;
        res.sendStatus(201);
    } catch(err) {
        res.status(404);
        res.send(err.message);
    };
};

module.exports = { 
    getDogById, 
    getAllDogs, 
    postDog 
};