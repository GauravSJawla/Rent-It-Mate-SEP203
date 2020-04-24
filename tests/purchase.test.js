const expect = require('expect');
const config = require('config');
const MongoClient = require('mongodb');
const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);
const FormData = require('formidable')
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');
const Profile = require('../models/Profile');
const User = require('../models/Users');

describe('user purchase products', () => {
  const mongoURI = config.get('mongoURI');
  let connection;
  let response;
  let token;
  let productId;

  //to execute before all tests
  beforeAll(async () => {
    connection = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  //to execute after All tests
  afterAll(() => {
    connection.close();
    request.close();
  });

  it('can get token', async() => {
      response = await request
      .post('/api/auth')
      .send({
        username: 'mercy',
        password: 'gentle',
      })
      .expect(200);
    token = response.body.token;
    if (token) {
      return expect(token).toBeTruthy();
    }
    return expect(token).toBeTruthy();
  });

  it('can create a product', async() => {
    var form = new FormData();
    const response = await request.post('/api/product/create')
                                          .set('x-auth-token' , token)
                                          .set('form-data' , form)
                                          .field('name','test product')
                                          .field('description' , 'test')
                                          .field('price',10)
                                          .field('subcategory', '5e9611dbb95a645f9804c3f1')
                                          .field('quantity', 1)
                                          .field('shipping','true')
                                          .attach('photo','./buffer/table.jpeg')
                                          .field('fromDate', '2020-04-20')
                                          .field('toDate','2020-05-20')
                                          .expect(response => {
                                          expect(response.status).toBe(200)})
    productId = response.body._id;
  })
  

  it('can create a purchase', async() => {
      const profileUser = await User.findOne({username:'mercy'});
      const duplicateProfile = await Profile.findOne({user:profileUser._id});
      if(duplicateProfile){
          console.log('inside duplicate profile');
          await Profile.remove(duplicateProfile);
      }
      response = await request.post('/api/purchase/' + productId)
                              .set('x-auth-token',token)
                              .send({
                                  "fromDate":"2020-04-25",
                                  "toDate":"2020-04-30"
                              }).expect(200);
      return expect(JSON.stringify(response.body)).toMatch("test");
  })

  it('can push the next purchase to already existing rented products array', async() => {
    response = await request.post('/api/purchase/' + productId)
                            .set('x-auth-token',token)
                            .send({
                                "fromDate":"2020-05-03",
                                 "toDate":"2020-05-07"
                                }).expect(200);
    return expect(JSON.stringify(response.body)).toMatch("test");
  })

  it('can get all purchases for particular product and user', async() => {
      const user = await User.findOne({username:'mercy'});
      response = await request.get('/api/purchase/' + productId)
                               .set('x-auth-token', token)
                               .expect(200);
  })

  it('can delete the profile and product', async() => {
    const profileUser = await User.findOne({username:'mercy'});
    const duplicateProfile = await Profile.findOne({user:profileUser._id});
    if(duplicateProfile){
        await Profile.remove(duplicateProfile);
    }
    const duplicateProduct = await Product.findOne({_id:productId});
    if(duplicateProduct){
        await Product.remove(duplicateProduct);
    }
  })

  it('can delete the purchase', async() => {
     const profileUser = await User.findOne({username:'mercy'});
      const duplicatePurchase = await Purchase.find({productId: productId,userId:profileUser._id})
      if(duplicatePurchase){
          await Purchase.deleteMany({productId: productId,userId:profileUser._id});
      }
  })
  
})