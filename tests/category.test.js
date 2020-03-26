const Category = require('../models/Category');
const Users = require('../models/Users');
const config = require('config');
const expect = require('expect');
const MongoClient = require('mongodb');
const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);

describe('category create/read/update/delete category', () => {
  const mongoURI = config.get('mongoURI');
  let connection, token, duplicateCategory;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    duplicateCategory = await Category.findOne({
      name: 'test category'
    });

    if (duplicateCategory) {
      console.log('inside delete');
      await Category.deleteOne(duplicateCategory);
    }
  });

  afterAll(() => {
    Users.deleteOne({ username: 'AdminUser' });
    connection.close();
    request.close();
    app.destroy();
  });

  it('can create an user in the database', async () => {
    await request
      .post('/api/users')
      .send({
        name: 'Admin',
        username: 'AdminUser',
        email: 'adminuser@gmail.com',
        password: 'admin'
      })
      .expect(200);
  });

  it('can get token', async () => {
    response = await request
      .post('/api/auth')
      .send({
        username: 'AdminUser',
        password: 'admin'
      })
      .expect(200);
    token = response.body.token;
    id = response.body.id;
    if (token) {
      return expect(token).toBeTruthy();
    }
    return expect(token).toBeTruthy();
  });

  it('can create a category', async () => {
    const response = await request
      .post('/api/category')
      .set('x-auth-token', token)
      .send({
        name: 'test category2'
      })
      .expect(200);

    return expect(JSON.stringify(response.body)).toMatch('test category2');
  });

  it('should give category already exists if duplicate category', async () => {
    const response = await request
      .post('/api/category')
      .set('x-auth-token', token)
      .send({
        name: 'test category2'
      })
      .expect(400);

    return expect(JSON.stringify(response.body)).toMatch(
      'Category already exists! Update it!'
    );
  });

  // it('can get all categories', async () => {
  //   const response = await request
  //     .get('/api/category')
  //     .set('x-auth-token', token)
  //     .expect(200);

  //   return expect(JSON.stringify(response.body));
  // });

  // it('should delete the profile', async () => {
  //   const response = await request
  //     .delete('/api/profile')
  //     .set('x-auth-token', token)
  //     .expect(200);
  //   return expect(JSON.stringify(response.body)).toMatch('User removed');
  // });
});
