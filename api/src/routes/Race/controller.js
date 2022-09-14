require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Race, Temperament, Op } = require('../../db');
const { createTemperaments } = require('../Temperament/controller');

let cont = 0;

const image = function(dog) {
    if (dog.image)
        return dog.image.url;  
    else if (dog.reference_image_id)
        return `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`;
    else
        return 'not found';
};

const apiFindDogById = async function(id) {
    let dog;
    await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            .then(response => response.data)
            .then(data => {
                dog = data.find(dog => dog.id == id);
            });
            if (dog) {
                dog = {
                    name: dog.name,
                    height: dog.height.metric,
                    weight: dog.weight.metric,
                    life_span: dog.life_span,
                    temperament: dog.temperament,
                    image: dog.image ? dog.image.url : 'Not Found'
                };
            };
            return dog;
};

const concatTemperamentsSingle = function(dog) {
    let temp = '';
    for (let i = 0; i < dog.temperaments.length; i++) {
        if(i < dog.temperaments.length - 1) {
            temp = temp.concat(dog.temperaments[i].name, ', '); 
        }
        else temp = temp.concat(dog.temperaments[i].name); // caso de borde;
    }
    dog.dataValues.temperaments = temp;
}; 

const dbFindDog = async function(id) {
    let dog;
    dog = await Race.findOne( ({
        where: {id: id},
        attributes: ['name', 'weight', 'height', 'life_span', 'image'],
        include: [{  
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }]
    }))
    if(dog) {
        concatTemperamentsSingle(dog);
      };
    return dog;
};

const concatTemperamentsMulti = function(dogs) {
    for (let i = 0; i < dogs.length; i++) {
        concatTemperamentsSingle(dogs[i]);
    };
};

const apiAllDogs = async function(endPoint) {
    let dogs = [];
    await axios(endPoint)
    .then(response => response.data)
    .then(data => {
        data.map(dog => dogs.push({
            id: dog.id,
            name: dog.name,
            height: dog.height.metric,
            weight: dog.weight.metric,
            temperaments: dog.temperament,
            image : image(dog)
            //image: dog.image ? dog.image.url : `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
            }),
        );
    });
    return dogs;
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
            res.status(404);
            res.send(err.message);
        }
    }
    
};

const postDog = async (req, res) => {
    const { name, height, weight } = req.body;
    req.body.id = cont + 'db';
    await createTemperaments();
    if(!(name || height || weight)) {
        res.status(404);
        return res.send('Falta enviar datos');
    }
    try {
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