const concatTemperamentsSingle = function (dog) {
    let temp = '';
    for (let i = 0; i < dog.temperaments.length; i++) {
        if (i < dog.temperaments.length - 1) {
            temp = temp.concat(dog.temperaments[i].name, ', ');
        }
        else temp = temp.concat(dog.temperaments[i].name); // caso de borde;
    }
    dog.dataValues.temperaments = temp;
};

module.exports = { concatTemperamentsSingle }