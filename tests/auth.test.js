const expect = require('expect');
const config = require('config');
const MongoClient = require('mongodb');
const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);

// connecting the database in the test class
describe('test user login', () => {
  const mongoURI = config.get('mongoURI');
  let connection;
  let response;
  let token;
  //executes before all the tests.
  beforeAll(async () => {
    connection = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });
  afterAll(() => {
    connection.close();
    request.close();
  });
  //checking whether the user gets token on login post request.
  //this test should assert true
  it('can get token', async () => {
    response = await request
      .post('/api/auth')
      .send({
        username: 'mercy',
        password: 'gentle'
      })
      .expect(200);
    token = response.body.token;
    if (token) {
      return expect(token).toBeTruthy();
    }
    return expect(token).toBeTruthy();
  });

  it('should get the user with token', async () => {
    response = await request
      .get('/api/auth')
      .set('x-auth-token', token)
      .expect(200);
    return expect(response.body).toBeTruthy();
  });

  it('should return an error if it is an invalid credentials', async () => {
    response = await request
      .post('/api/auth')
      .send({
        username: 'mercy',
        password: 'mercy'
      })
      .expect(400);
    return expect(JSON.stringify(response.body)).toMatch('Invalid Credentials');
  });

  it('should return an error of invalid credentials if no user exists', async () => {
    response = await request
      .post('/api/auth')
      .send({
        username: 'mercy1',
        password: 'gentle'
      })
      .expect(400);
    return expect(JSON.stringify(response.body)).toMatch('Invalid Credentials');
  });

  it('should return admin user based on the token received', async() => {
    response = await request.post('/api/auth')
                .send({
                  username:'admin',
                  password:'admin'
                }).expect(200)
    token = response.body.token;
    response = await request.get('/api/auth')
                  .set('x-auth-token',token)
                  .expect(200);
    return expect(response.body.role).toMatch('admin');
    
  });
});
