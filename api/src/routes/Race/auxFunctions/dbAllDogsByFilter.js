const { Race, Temperament, Op } = require('../../../db');
const { concatTemperamentsMulti } = require('./concatTemperamentsMulti');

const dbAllDogsByFilter = async function (filter) {
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

module.exports = { dbAllDogsByFilter }; 