const { Race } = require('../../../db');
const { createTemperaments } = require('../../Temperament/controller');

let cont = 0;

const postDog = async (req, res) => {
    const { name, height, weight } = req.body;
    req.body.id = cont + 'db';
    await createTemperaments();
    if (!(name || height || weight)) {
        res.status(400);
        return res.send('Missing to send mandatory data');
    }
    try {
        const newRace = await Race.create(req.body);
        await newRace.setTemperaments(req.body.temperament);
        res.sendStatus(201);
    } catch (err) {
        res.status(400);
        res.send(err.message);
    };
    cont++;
};

module.exports = { postDog }; 