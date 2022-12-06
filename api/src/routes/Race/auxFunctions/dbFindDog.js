const { concatTemperamentsSingle } = require('./concatTemperamentsSingle');
const { Race, Temperament} = require('../../../db');

const dbFindDog = async function (id) {
    let dog;
    dog = await Race.findOne(({
        where: { id: id },
        attributes: ['name', 'weight', 'height', 'life_span', 'image'],
        include: [{
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }]
    }))
    if (dog) {
        concatTemperamentsSingle(dog);
    };
    return dog;
};

module.exports = { dbFindDog }