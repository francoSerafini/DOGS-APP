/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Race, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  id:'45db',
  name: 'Pug',
  height: '12-14',
  weight: '5-6',
  life_span: '10-12',
  image: 'algo.jpg',
};

describe('Race routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Race.sync({ force: true })
    .then(() => Race.create(dog)));

  describe('GET /dogs', () => {
    it('Responds with 200', () =>agent.get('/dogs').expect(200));
    it('Responds with an array with the dogs info', () =>
      agent.get('/dogs').then((res) => {
        expect(res.body[0].name).to.be.equal(
          'Affenpinscher',
        );
        expect(res.body[0].image).to.be.equal(
          "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
        );
      }));
  });
  
  describe('GET /dogs/:idRace', () => {
    it('Responds with 200 if find a dog whit the params id', () => agent.get('/dogs/5').expect(200)); 
    it('Responds with an object with the data of the dog that matches the id', () => 
      agent.get('/dogs/5').then((res) => {
        expect(res.body.name).to.be.equal(
          "Akbash Dog",
        );
        expect(res.body.height).to.be.equal(
          "71 - 86"
        );
        expect(res.body.life_span).to.be.equal(
          "10 - 12 years"
        );
      }));
    it('Responds with 404 if not find a dog whit the paramas id', () => agent.get('/dogs/p').expect(404));
  });
  
  describe('POST /dogs', () => {
    it('Responds whit 201 if the dog could be created', () => 
      agent.post('/dogs')
      .send({
        id:'45db',
        name: 'Doggy',
        height: '12-14',
        weight: '5-6',
        life_span: '10-12',
        image: 'algo.jpg',
        temperament: [1,2,3]
      }).expect(201));
    it('Responds with 400', () => agent.post('/dogs').expect(400));
  });
});
  