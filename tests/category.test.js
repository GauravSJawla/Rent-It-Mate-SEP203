const Category = require('../models/Category');
const Subcategory = require('../models/SubCategory');
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
      await Category.deleteOne(duplicateCategory);
    }

    const duplicateCategory2 = await Category.findOne({
      name: 'test category2'
    });

    if (duplicateCategory2) {
      await Category.deleteOne(duplicateCategory2);
    }
  });

  afterAll(() => {
    connection.close();
    request.close();
    app.destroy();
  });

  it('can get token', async () => {
    response = await request
      .post('/api/auth')
      .send({
        username: 'admin',
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

  it('should not delete a category if there are subcategories to it', async() => {
    const category = await Category.findOne({ name: 'test category3' });
    const subCategoryRes = await request.post('/api/subcategory/')
                            .set('x-auth-token',token)
                            .send({
                              name:'subcategory1',
                              categoryId:category._id
                            }).expect(200);
    const res = await request.delete('/api/category/' + category._id)
                            .set('x-auth-token',token)
    return expect(JSON.stringify(res.body))
                    .toMatch('Category has sub categories available and hence cannot be deleted!');
  
  })

  it('should delete a category by category ID', async () => {
    const subcategory = await Subcategory.findOne({name : 'subcategory1'});
    await Subcategory.findByIdAndRemove({_id:subcategory._id})
    const category = await Category.findOne({ name: 'test category3' });
    const response = await request
      .delete('/api/category/' + category._id)
      .set('x-auth-token', token)
      .expect(200);

    return expect(JSON.stringify(response.body)).toMatch('Category deleted');
  });
});
