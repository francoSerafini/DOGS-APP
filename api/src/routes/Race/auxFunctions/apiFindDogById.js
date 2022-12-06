const { API_KEY } = process.env;
const axios = require('axios');

const apiFindDogById = async function (id) {
    let dog = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    dog = dog.data.find(dog => dog.id == id);
    if (dog) {
        dog = {
            name: dog.name,
            height: dog.height.metric,
            weight: dog.weight.metric,
            life_span: dog.life_span,
            temperaments: dog.temperament,
            image: dog.image ? dog.image.url : 'Not Found'
        };
    };
    return dog;
};

module.exports = { apiFindDogById }