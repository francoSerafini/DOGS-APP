const express = require('express');

const temperamentsController = require('./controller');

const router = express.Router();

router.get('/', temperamentsController.getAllTemperaments);

module.exports = router;   