require('dotenv').config();
const { API_KEY } = process.env;
const { Race, Temperament, Op } = require('../../db');
const { createTemperaments } = require('../Temperament/controller');
const { apiAllDogs } = require('../Race/auxFunctions/apiAllDogs');
const { apiFindDogById } = require('../Race/auxFunctions/apiFindDogById');
const { concatTemperamentsSingle } = require('../Race/auxFunctions/concatTemperamentsSingle');
const { dbFindDog } = require('../Race/auxFunctions/dbFindDog');

let cont = 0;   

const concatTemperamentsMulti = function(dogs) {
    for (let i = 0; i < dogs.length; i++) {
        concatTemperamentsSingle(dogs[i]);
    };
};

const dbAllDogsByFilter = async function(filter) {
    let allRacesDb = await Race.findAll({
        where: {
            name: {
                [Op.substring]: `${filter}`
            }
        },
        include: [{  
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []   
            }
        }]
    });
    concatTemperamentsMulti(allRacesDb);
    return allRacesDb;
};

const dbAllDogs = async function() {
    let allRacesDb = await Race.findAll({    
        attributes: ['id', 'name', 'weight', 'image'],
        include: [{  
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }]
    });
    concatTemperamentsMulti(allRacesDb);
    return allRacesDb;
};

const getDogById = async (req, res) => {
    let id = req.params.idRace;
    let dog;   
    try {
        if(!isNaN(id)){  //Si no puede convertir el id lo busca en la API externa
            dog = await apiFindDogById(id);
        }
        else {
            dog = await dbFindDog(id);
        }
        dog ? 
            res.status(200).send(dog)   
            : res.sendStatus(404);
    }     
    catch(err) {
        res.send(err.message);
    }; 
};

const getAllDogs = async (req, res) => {
    let race = req.query.name;
    let allRaces = []; 
    if(race) {
        race = race.toLowerCase().split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
        try {
            allRaces = allRaces.concat(await apiAllDogs(`https://api.thedogapi.com/v1/breeds/search?q=${race}&api_key=${API_KEY}`));
            let allRacesDb = await dbAllDogsByFilter(race);
            allRaces = allRaces.concat(allRacesDb);
            let notFound = [{
                id:'notFound', 
                name: 'There is no race that contains ' + race, 
                image: 'https://c8.alamy.com/compes/2ejmtjf/la-persona-con-cabeza-de-perro-esta-consusa-sobre-algo-concepto-de-consusion-2ejmtjf.jpg'
            }]
            if (allRaces.length === 0) return res.send(notFound);
            res.status(200);
            res.send(allRaces);
        }
        catch(err) {
            res.status(500);
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
            res.status(500);
            res.send(err.message);
        }
    }
};

const postDog = async (req, res) => {
    const { name, height, weight } = req.body;
    req.body.id = cont + 'db';
    await createTemperaments();
    if(!(name || height || weight)) {
        res.status(400);
        return res.send('Missing to send mandatory data');
    }
    try {
        const newRace = await Race.create(req.body);
        await newRace.setTemperaments(req.body.temperament);
        res.sendStatus(201);
    } catch(err) {
        res.status(400);
        res.send(err.message);
    };
    cont++;
};

const deleteDog = async (req, res) => {
    let id = req.body.id;
    const dog = await Race.findOne({ where: { id: id }});
    if(dog) {
        Race.destroy({ where: { id: id }});
        res.status(200);
        res.send('Dog deleted');
    }else{
        res.status(400);
        res.send('No dog found with the id provided');
    };
};

const updateDog = async (req, res) => {
    const id  = req.params.idRace;
    const dog = await Race.findOne({ where: { id: id}});
    const { value, attribute } = req.body;
    if(!dog) {
        res.status(400);
        res.send('No dog found whith the id provided');
    }else if(attribute !== 'name' && attribute !== 'height' && attribute !== 'weight' &&  
        attribute !== 'temperaments' && attribute !== 'image' && attribute !== 'life_span') {
            res.status(400);
            res.send('Invalid atribute');    
   }else{       
        try {
            Race.update({
                [attribute]: value
            }, {
                where: { id: id }});
            res.status(200);
            res.send('Dog updated succesfuly'); 
        }catch(err) {
            res.status(400);
            res.send(err.message);
        };         
   };
};

module.exports = { 
    getDogById, 
    getAllDogs, 
    postDog ,
    deleteDog,
    updateDog
};