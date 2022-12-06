const express = require('express');

const { getDogById } = require('../Race/controllers/getDogById');
const { getAllDogs } = require('../Race/controllers/getAllDogs');
const { postDog } = require('../Race/controllers/postDog');
const { deleteDog } = require('../Race/controllers/deleteDog');
const { updateDog } = require('../Race/controllers/updateDog');

const router = express.Router();

router.get('/:idRace', getDogById);

router.put('/:idRace', updateDog);

router.get('/', getAllDogs);

router.post('/', postDog);

router.delete('/', deleteDog);

module.exports = router;


