const express = require('express');

const dogsController = require('./controller');

const router = express.Router();

router.get('/:idRace', dogsController.getDogById);

router.put('/:idRace', dogsController.updateDog);
    
router.get('/', dogsController.getAllDogs);

router.post('/', dogsController.postDog);

router.delete('/', dogsController.deleteDog);    

module.exports = router;


