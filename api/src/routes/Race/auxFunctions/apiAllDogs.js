const axios = require('axios');

const image = function (dog) {
    if (dog.image)
        return dog.image.url;
    else if (dog.reference_image_id)
        return `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`;
    else
        return 'not found';
};

const apiAllDogs = async function (endPoint) {
    let dogs = [];
    let apiData = await axios(endPoint);
    apiData = apiData.data.map(dog => dogs.push({
        id: dog.id,
        name: dog.name,
        weight: dog.weight.metric,
        temperaments: dog.temperament,
        image: image(dog)
    }));
    return dogs;
};

module.exports = { apiAllDogs }