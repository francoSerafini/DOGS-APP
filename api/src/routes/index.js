const express = require('express');

const dogsRouter = require('./Race');
const temperamentsRouter = require('./Temperament');

const router = express.Router();

router.use(express.json());
router.use('/dogs', dogsRouter);
router.use('/temperaments', temperamentsRouter);

module.exports = router;

    