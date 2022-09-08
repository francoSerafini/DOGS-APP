const express = require('express');

const dogsController = require('./controller');

const router = express.Router();

router.get('/:idRace', dogsController.getDogById);
    
router.get('/', dogsController.getAllDogs);

router.post('/', dogsController.postDog);

module.exports = router;


