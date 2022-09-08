require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Race, Temperament, Op } = require('../../db');

const apiFindDog = async function(id) {
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
        attributes: ['name', 'weight', 'height', 'life_span'],
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
}



const getDogById = async (req, res) => {
    let id = req.params.idRace;
    let dog;
    try {
        if(!isNaN(id)){  //Si no puede convertir el id lo busca en la API externa
            dog = await apiFindDog(id);
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
        race = race.toUpperCase();
        try {
            await axios(`https://api.thedogapi.com/v1/breeds/search?q=${race}&api_key=${API_KEY}`)
            .then(response => response.data)
            .then(data => {
                data.map(r => allRaces.push({
                    id: r.id,
                    name: r.name,
                    height: r.height.metric,
                    weight: r.weight.metric,
                    temperaments: r.temperament,
                    image: r.image ? r.image.url : 'Not Found'
                    }),
                );
            });
            let allRacesDb = await Race.findAll({
                where: {
                    name: {
                        [Op.substring]: `${race[0].toUpperCase() + race.slice(1)}`
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
            for (let i = 0; i < allRacesDb.length; i++) {
                let temp = '';
                for (let a = 0; a < allRacesDb[i].temperaments.length; a++) {
                    if (i < allRacesDb[i].temperaments.length - 1) {
                        temp = temp.concat(allRacesDb[i].temperaments[a].name, ', ');
                    }
                    else temp = temp.concat(allRacesDb[i].temperaments[a].name);
                };
                allRacesDb[i].dataValues.temperaments = temp;
            };
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
            await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            .then(response => response.data)
            .then(data => {
                data.map(race => allRaces.push({
                    name: race.name,
                    weight: race.weight.metric,
                    temperaments: race.temperament,
                    image: race.image.url
                    }),
                );
            });
            let allRacesDb = await Race.findAll({
                attributes: ['name', 'weight'],
                include: [{  
                    model: Temperament,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }]
            });
            for (let i = 0; i < allRacesDb.length; i++) {
                let temp = '';
                for (let a = 0; a < allRacesDb[i].temperaments.length; a++) {
                    if (i < allRacesDb[i].temperaments.length - 1) {
                        temp = temp.concat(allRacesDb[i].temperaments[a].name, ', ');
                    }
                    else temp = temp.concat(allRacesDb[i].temperaments[a].name);
                };
                allRacesDb[i].dataValues.temperaments = temp;
            };
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
    const {name, height, weight, life_span, temperament } = req.body;
    if(!name) {
        res.status(404);
        return res.send('Falta enviar datos');
    }
    try {
        const newRace = await Race.create({
            id: await Race.count() + 1 + 'db',
            name,
            height,
            weight,
            life_span
        });
        const promises = temperament.map(temp => newRace.addTemperament(temp));
        await Promise.all(promises);
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