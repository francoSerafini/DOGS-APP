const { apiFindDogById } = require('../auxFunctions/apiFindDogById');
const { dbFindDog } = require('../auxFunctions/dbFindDog');

const getDogById = async (req, res) => {
    let id = req.params.idRace;
    let dog;
    try {
        if (!isNaN(id)) {
            dog = await apiFindDogById(id);
        }
        else {
            dog = await dbFindDog(id);
        }
        dog ?
            res.status(200).send(dog)
            : res.sendStatus(404);
    }
    catch (err) {
        res.send(err.message);
    };
};

module.exports = { getDogById }; 