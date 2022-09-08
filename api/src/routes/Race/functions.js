require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Race, Temperament, Op } = require('../../db');

const capitalizeString = function(string) {
    let stringCapitalized = string.split(' '.map(str => str[0].toUpperCase() + str.slice(1)).join(' '));
    return stringCapitalized;
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
};

const concatTemperamentsMulti = function(dogs) {
    for (let i = 0; i < dogs.length; i++) {
        let temp = '';
        for (let a = 0; a < dogs[i].temperaments.length; a++) {
            if (i < dogs[i].temperaments.length - 1) {
                temp = temp.concat(dogs[i].temperaments[a].name, ', ');
            }
            else temp = temp.concat(dogs[i].temperaments[a].name);
        };
        dogs[i].dataValues.temperaments = temp;
    };
}

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
            image: dog.image ? dog.image.url : 'Not Found'
            }),
        );
    });
    return dogs;
};

const dbAllDogsByFilter = async function(filter) {
    let allRacesDb = await Race.findAll({
        where: {
            name: {
                [Op.substring]: `${capitalizeString(filter)}`
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
        attributes: ['name', 'weight'],
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
                }
            }
            return temperaments;
        });    
        await Array.from(allTemperaments).map(temp => Temperament.create({ name: temp }));
    }
};



module.exports = {
    capitalizeString,
    apiFindDogById,
    dbFindDog,
    apiAllDogs,
    dbAllDogsByFilter,
    dbAllDogs,
    createTemperaments
}