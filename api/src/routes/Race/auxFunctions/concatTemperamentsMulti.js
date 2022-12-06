const { concatTemperamentsSingle } = require('./concatTemperamentsSingle');

const concatTemperamentsMulti = function (dogs) {
    for (let i = 0; i < dogs.length; i++) {
        concatTemperamentsSingle(dogs[i]);
    };
};

module.exports = { concatTemperamentsMulti }; 