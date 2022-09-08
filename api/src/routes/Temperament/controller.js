require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Temperament } = require('../../db');
const { createTemperaments } = require('../Race/functions')

const getAllTemperaments =  async (req, res) => {
    try {
        await createTemperaments();
        res.sendStatus(200);
    } catch(err) {
        res.status(500).send(err.msg)
    }    
};
   

module.exports = { getAllTemperaments };