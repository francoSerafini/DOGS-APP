const { concatTemperamentsMulti } = require('./concatTemperamentsMulti');
const { Race, Temperament } = require('../../../db');

const dbAllDogs = async function () {
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

module.exports = { dbAllDogs }; 