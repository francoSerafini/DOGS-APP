const { Race } = require('../../../db');

const updateDog = async (req, res) => {
    const id = req.params.idRace;
    const dog = await Race.findOne({ where: { id: id } });
    const { value, attribute } = req.body;
    if (!dog) {
        res.status(400);
        res.send('No dog found whith the id provided');
    } else if (attribute !== 'name' && attribute !== 'height' && attribute !== 'weight' &&
        attribute !== 'temperaments' && attribute !== 'image' && attribute !== 'life_span') {
        res.status(400);
        res.send('Invalid atribute');
    } else {
        try {
            Race.update({
                [attribute]: value
            }, {
                where: { id: id }
            });
            res.status(200);
            res.send('Dog updated succesfuly');
        } catch (err) {
            res.status(400);
            res.send(err.message);
        };
    };
};

module.exports = { updateDog };