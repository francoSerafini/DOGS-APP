require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
// Importar todos los routers;
const { Raza, Temperamento, Op } = require('../db');
const { API_KEY } = process.env;

const router = express.Router();
router.use(express.json());
router.use(cors());


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs/:idRaza', async (req, res) => {
    let id = req.params;
    let perro;

    try {
        await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            .then(response => response.data)
            .then(data => {
                perro = data.find(p => p.id === id)
            });
        if (perro) {
            perro = {
                nombre: perro.name,
                altura: perro.height.metric,
                peso: perro.weight.metric,
                anios: perro.life_span,
                temperamentos: perro.temperament,
                image: perro.image ? perro.image.url : 'Not Found'
            }
        }
        else {
            perro = await Raza.findOne( ({
                where: {id: id},
                attributes: ['nombre', 'peso', 'altura', 'anios'],
                include: [{  
                    model: Temperamento,
                    attributes: ['nombre'],
                    through: {
                        attributes: []
                    }
                }]
            }))
            if(perro) {
                let temp = '';
                for (let i = 0; i < perro.temperamentos.length; i++) {
                    temp = temp.concat(perro.temperamentos[i].nombre, ', ')
                }
                perro.dataValues.temperamentos = temp;
            }; //Aca me quede.
        };
    }
    
        
    catch(err) {}
    })
    


router.get('/dogs', async (req, res) => {
    let raza = req.query.name;
    let allRazas = [];

    if(raza) {
        try {
            await axios(`https://api.thedogapi.com/v1/breeds/search?q=${raza}&api_key=${API_KEY}`)
            .then(response => response.data)
            .then(data => {
                data.map(r => allRazas.push({
                    id: r.id,
                    nombre: r.name,
                    altura: r.height.metric,
                    peso: r.weight.metric,
                    temperamentos: r.temperament,
                    image: r.image ? r.image.url : 'Not Found'
                    }),
                );
            });
            let allRazasDb = await Raza.findAll({
                where: {
                    nombre: {
                        [Op.substring]: `${raza}`
                    }
                },
                include: [{  
                    model: Temperamento,
                    attributes: ['nombre'],
                    through: {
                        attributes: []
                    }
                }]
            });
            for (let i = 0; i < allRazasDb.length; i++) {
                let temp = '';
                for (let a = 0; a < allRazasDb[i].temperamentos.length; a++) {
                    temp = temp.concat(allRazasDb[i].temperamentos[a].nombre, ', ');
                };
                allRazasDb[i].dataValues.temperamentos = temp;
            };
            allRazas.concat(allRazasDb);
            if (allRazas.length === 0) return res.status(404).send('No existe ninguna raza de perro que incluya los valores ingresado');
            res.status(200);
            res.send(allRazas);
        }
        catch(err) {
            res.status(400);
            res.send(err.message);
        }
    }

    else {
        try {
            await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            .then(response => response.data)
            .then(data => {
                data.map(raza => allRazas.push({
                    nombre: raza.name,
                    peso: raza.weight.metric,
                    temperamentos: raza.temperament,
                    image: raza.image.url
                    }),
                );
            });
            let allRazasDb = await Raza.findAll({
                attributes: ['nombre', 'peso'],
                include: [{  
                    model: Temperamento,
                    attributes: ['nombre'],
                    through: {
                        attributes: []
                    }
                }]
            });
            for (let i = 0; i < allRazasDb.length; i++) {
                let temp = '';
                for (let a = 0; a < allRazasDb[i].temperamentos.length; a++) {
                    temp = temp.concat(allRazasDb[i].temperamentos[a].nombre, ', ');
                };
                allRazasDb[i].dataValues.temperamentos = temp;
            };
            allRazas.concat(allRazasDb);
            res.status(200);
            res.send(allRazas);
        }
        catch(err) {
            res.status(400);
            res.send(err.message);
        }
    }
    
});


module.exports = router;

//{"weight":{"imperial":"6 - 13","metric":"3 - 6"},
//"height":{"imperial":"9 - 11.5","metric":"23 - 29"},
//"id":1,
//"name":"Affenpinscher",
//"bred_for":"Small rodent hunting, lapdog",
//"breed_group":"Toy",
//"life_span":"10 - 12 years",
//"temperament":"Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
//"origin":"Germany, France",
//"reference_image_id":"BJa4kxc4X",
//"image":
    //{"id":"BJa4kxc4X",
    //"width":1600,"height":1199,
    //"url":"https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"}
//}