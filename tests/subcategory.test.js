const SubCategory = require('../models/SubCategory');
const Users = require('../models/Users');
const config = require('config');
const expect = require('expect');
const MongoClient = require('mongodb');
const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);

describe('create/read/update/delete sub-category', () => {
  const mongoURI = config.get('mongoURI');
  let connection, token;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const duplicateSubCategory = await SubCategory.findOne({
      name: 'test subcategory3'
    });

    if (duplicateSubCategory) {
      console.log('inside delete');
      await SubCategory.deleteOne(duplicateSubCategory);
    }

    const duplicateSubCategory2 = await SubCategory.findOne({
      name: 'test subcategory2'
    });

    if (duplicateSubCategory2) {
      console.log('inside delete2');
      await SubCategory.deleteOne(duplicateSubCategory2);
    }
  });

  afterAll(() => {
    connection.close();
    request.close();
    app.destroy();
  });

  it('can get the token', async () => {
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

  it('can create a sub-category', async () => {
    const response = await request
      .post('/api/subcategory')
      .set('x-auth-token', token)
      .send({
        name: 'test subcategory2'
      })
      .expect(200);

    return expect(JSON.stringify(response.body)).toMatch('test sub-category2');
  });

  it('should give sub-category already exists if duplicate sub-category', async () => {
    const response = await request
      .post('/api/subcategory')
      .set('x-auth-token', token)
      .send({
        name: 'test subcategory2'
      })
      .expect(400);

    return expect(JSON.stringify(response.body)).toMatch(
      'Sub-Category already exists! Update it!'
    );
  });

  it('can get all sub-categories', async () => {
    const response = await request
      .get('/api/subcategory')
      .set('x-auth-token', token)
      .expect(200);

    return expect(JSON.stringify(response.body));
  });

  it('can get a sub-category by the sub-category ID', async () => {
    const category = await SubCategory.findOne({ name: 'test sub-category2' });
    const response = await request
      .get('/api/subcategory/' + category._id)
      .set('x-auth-token', token)
      .expect(200);

    return expect(JSON.stringify(response.body));
  });

  it('should give the sub-category not found error if no specified sub-category present', async () => {
    const category_id = 'dummy';
    const response = await request
      .get('/api/subcategory/' + category_id)
      .set('x-auth-token', token)
      .expect(400);

    return expect(JSON.stringify(response.body)).toMatch('Sub-Category not found!');
  });

  it('should update a category by category ID', async () => {
    const category = await SubCategory.findOne({ name: 'test sub-category2' });
    const response = await request
      .post('/api/subcategory/' + category._id)
      .set('x-auth-token', token)
      .send({
        name: 'test subcategory3'
      })
      .expect(200);

    return expect(JSON.stringify(response.body)).toMatch('test category3');
  });

  it('should delete a sub-category by the sub-category ID', async () => {
    const category = await SubCategory.findOne({ name: 'test sub-category3' });
    const response = await request
      .delete('/api/subcategory/' + category._id)
      .set('x-auth-token', token)
      .expect(200);

    return expect(JSON.stringify(response.body)).toMatch('Sub-Category deleted');
  });
});
