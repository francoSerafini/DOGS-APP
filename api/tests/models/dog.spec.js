const { Race, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Race.sync({ force: true }));
    describe('name', () => {
      it('Should throw an error if name is null', (done) => {
        Race.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('Should work when its a valid name', () => {
        Race.create({ name: 'perrote' });
      });
    });
    describe('heigth', () => {
      it('Should throw an error if heigth is not a String', (done) => {
        Race.create({ heigth: 5})
        .then(() => done(new Error('It requires a String')))
        .catch(() => done());
      });
    });
    describe('All properties', () => {
      it('Should create the Race if all required properties are ok', async () => {
        const dog = await Race.create({
          id:'3db',
          name:'doggerman',
          height: '20 - 22',
          weight: '12 - 14',
        });
        expect(dog.toJSON()).to.have.property('name', 'Doggerman');
        expect(dog.toJSON()).to.have.property('life_span', ' ∞ ');
        expect(dog.toJSON()).to.have.property('image', 'https://cloudfront-us-east-1.images.arcpublishing.com/eluniverso/EDF3KKJZQBFP5EYYTL6GJPRVZ4.jpg')
      });
    });
  });
});
