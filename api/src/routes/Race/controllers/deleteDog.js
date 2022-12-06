const { Race } = require('../../../db');

const deleteDog = async (req, res) => {
    let id = req.body.id;
    const dog = await Race.findOne({ where: { id: id } });
    if (dog) {
        Race.destroy({ where: { id: id } });
        res.status(200);
        res.send('Dog deleted');
    } else {
        res.status(400);
        res.send('No dog found with the id provided');
    };
};

module.exports = { deleteDog };