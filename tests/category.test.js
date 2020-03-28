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
  let connection, token;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const duplicateCategory = await Category.findOne({
      name: 'test category3'
    });

    if (duplicateCategory) {
      console.log('inside delete');
      await Category.deleteOne(duplicateCategory);
    }

    const duplicateCategory2 = await Category.findOne({
      name: 'test category2'
    });

    if (duplicateCategory2) {
      console.log('inside delete2');
      await Category.deleteOne(duplicateCategory2);
    }

    // const user = Users.findOne({ username: 'AdminUser' });
    // if (user) {
    //   await Users.deleteOne({ username: 'AdminUser' });
    // }
  });

  afterAll(() => {
    //Users.deleteOne({ username: 'AdminUser' });
    connection.close();
    request.close();
    app.destroy();
  });

  // it('can create an user in the database', async () => {
  //   const response = await request
  //     .post('/api/users')
  //     .send({
  //       name: 'Admin',
  //       username: 'AdminUser',
  //       email: 'adminuser@gmail.com',
  //       password: 'admin'
  //     })
  //     .expect(200);
  //   return expect(JSON.stringify(response.body));
  // });

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

  it('can get all categories', async () => {
    const response = await request
      .get('/api/category')
      .set('x-auth-token', token)
      .expect(200);

    return expect(JSON.stringify(response.body));
  });

  it('can get a category by category ID', async () => {
    const category = await Category.findOne({ name: 'test category2' });
    const response = await request
      .get('/api/category/' + category._id)
      .set('x-auth-token', token)
      .expect(200);

    return expect(JSON.stringify(response.body));
  });

  it('should give category not found error if no specified category present', async () => {
    const category_id = 'dummy';
    const response = await request
      .get('/api/category/' + category_id)
      .set('x-auth-token', token)
      .expect(400);

    return expect(JSON.stringify(response.body)).toMatch('Category not found!');
  });

  it('should update a category by category ID', async () => {
    const category = await Category.findOne({ name: 'test category2' });
    const response = await request
      .post('/api/category/' + category._id)
      .set('x-auth-token', token)
      .send({
        name: 'test category3'
      })
      .expect(200);

    return expect(JSON.stringify(response.body)).toMatch('test category3');
  });

  it('should delete a category by category ID', async () => {
    const category = await Category.findOne({ name: 'test category3' });
    const response = await request
      .delete('/api/category/' + category._id)
      .set('x-auth-token', token)
      .expect(200);

    return expect(JSON.stringify(response.body)).toMatch('Category deleted');
  });
});
