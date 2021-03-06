const Product = require('../models/Product');
const Users = require('../models/Users');
const config = require('config');
const expect = require('expect');
const MongoClient = require('mongodb');
const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);
//form data
const FormData = require('formidable')
const fs = require('fs');
/**
 * This is a test framework for product.js.
 * It works by first creating a test product using authentication.
 * It updates this product by adding a different picture and name for it and we can also change the description and everything
 * Then we delete this product.
 */
describe('product create/update/delete product', () => {
    const mongoURI = config.get('mongoURI');
    let connection,token, duplicateProduct;

    beforeAll( async() => {
        connection = await MongoClient.connect(mongoURI, {useNewUrlParser: true,
            useUnifiedTopology: true});
        duplicateProduct = await Product.findOne({
              name : 'test product',
              description :'test',
              price : 10,
              subcategory : '5e9611dbb95a645f9804c3f1',
              quantity : 1,
              shipping : true
            })
        if(duplicateProduct){
          console.log('inside delete')
             await Product.deleteOne(duplicateProduct);
            }
        const user = Users.findOne({ username : 'TestUser2' })   
        if(user){
          await Users.deleteOne({username : 'TestUser2'})
        }
     });
     
     afterAll( async() => {
      await Users.deleteOne({ username : 'TestUser2'})
        connection.close();
        request.close();
    });
    it('can create an user in the database', async () => {
      await request.post('/api/users')
      .send({
          name : 'Test2',
          username : 'TestUser2',
          email : 'testuser2@gmail.com',
          password : 'test'

      }).expect(200);
    });
    it('can get token', async () => {
        response = await request
          .post('/api/auth')
          .send({
            username: 'TestUser2',
            password: 'test'
          })
          .expect(200);
        token = response.body.token;
        if (token) {
          return expect(token).toBeTruthy();
        }
        return expect(token).toBeTruthy();
      });

      it('can create a product', async() => {
      //creating a product in form
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
                                          .field('zipcode', 52402)
                                          .attach('photo','./buffer/table.jpeg')
                                          .field('fromDate', '2020-04-20')
                                          .field('toDate','2020-05-20')
                                          .expect(response => {
                                          expect(response.status).toBe(200)})
    return expect(JSON.stringify(response.body)).toMatch('test product')
    });

    it('cannot create a product - fail when fields are missing', async() => {
      //creating a product in form
      var form = new FormData();
       const response = await request.post('/api/product/create')
                                          .set('x-auth-token' , token)
                                          .set('form-data' , form)
                                          .field('name','test product')
                                          .field('description' , '')
                                          .field('price',10)
                                          .field('zipcode', 52402)
                                          .field('subcategory', '')
                                          .field('quantity', 1)
                                          .field('shipping','true')
                                          .attach('photo','./buffer/table.jpeg')
                                          .expect(response => {
                                          expect(response.status).toBe(400)})
    });

    /**
     * To validate if subcategory selection is empty
     */
    it('throw an error of all fields required if no subcategory is filled', async() => {
      var form = new FormData();
       const response = await request.post('/api/product/create')
                                          .set('x-auth-token' , token)
                                          .set('form-data' , form)
                                          .field('name','test product')
                                          .field('description' , 'test')
                                          .field('price',10)
                                          .field('quantity', 1)
                                          .field('shipping','true')
                                          .field('zipcode', 52402)
                                          .attach('photo','./buffer/table.jpeg')
                                          .field('fromDate', '2020-04-20')
                                          .field('toDate','2020-05-20')
                                          .expect(response => {
                                          expect(response.status).toBe(400)})
      return expect(JSON.stringify(response.body)).toMatch('All fields are required');
    })

    it('throw an error of smaller date id end date is smaller than start date', async() => {
      var form = new FormData();
       const response = await request.post('/api/product/create')
                                          .set('x-auth-token' , token)
                                          .set('form-data' , form)
                                          .field('name','test product')
                                          .field('description' , 'test')
                                          .field('price',10)
                                          .field('quantity', 1)
                                          .field('shipping','true')
                                          .field('subcategory', '5e9611dbb95a645f9804c3f1')
                                          .field('zipcode', 52402)
                                          .attach('photo','./buffer/table.jpeg')
                                          .field('fromDate', '2020-04-20')
                                          .field('toDate','2020-04-20')
                                          .expect(response => {
                                          expect(response.status).toBe(400)})
      return expect(JSON.stringify(response.body)).toMatch('End date less than from date');
    })
    /**
     * test for update - when one of the parameters does not exist
     */
    it('cannot update a product - when some fields are missing', async() => {
      //creating a product in form
      var form = new FormData();
      duplicateProduct = await Product.findOne({
        name : 'test product',
        description :'test',
        price : 10,
        subcategory : '5e9611dbb95a645f9804c3f1',
        quantity : 1,
        shipping : true
      })
      await request.put('/api/product/'+duplicateProduct._id)
                                          .set('x-auth-token' , token)
                                          .set('form-data' , form)
                                          .field('name','test product updated')
                                          .field('description' , '')
                                          .field('price',10)
                                          .field('zipcode', 52402)
                                          .field('subcategory', '')
                                          .field('quantity', 1)
                                          .field('shipping','true')
                                          .attach('photo','./buffer/table_01.jpeg')
                                          .expect(response => {
                                          expect(response.status).toBe(400)})
    });
    /**
     * test for update - when one of the parameters does not exist
     */
    it('cannot update a product - when image is greater than 1mb', async() => {
      //creating a product in form
      var form = new FormData();
      duplicateProduct = await Product.findOne({
        name : 'test product',
        description :'test',
        price : 10,
        subcategory : '5e9611dbb95a645f9804c3f1',
        quantity : 1,
        shipping : true
      })
      await request.put('/api/product/'+duplicateProduct._id)
                                          .set('x-auth-token' , token)
                                          .set('form-data' , form)
                                          .field('name','test product updated')
                                          .field('description' , 'description')
                                          .field('price',10)
                                          .field('zipcode', 52402)
                                          .field('subcategory', '5e9611dbb95a645f9804c3f1')
                                          .field('quantity', 1)
                                          .field('shipping','true')
                                          .attach('photo','./buffer/over_size.jpg')
                                          .field('fromDate', '2020-04-20')
                                          .field('toDate','2020-05-20')
                                          .expect(response => {
                                          expect(response.status).toBe(400)})
    });
   /**
     * test for update
     */
    it('can update a product', async() => {
      //creating a product in form
      var form = new FormData();
      duplicateProduct = await Product.findOne({
        name : 'test product',
        description :'test',
        price : 10,
        subcategory : '5e9611dbb95a645f9804c3f1',
        quantity : 1,
        shipping : true
      })
      await request.put('/api/product/'+duplicateProduct._id)
                                          .set('x-auth-token' , token)
                                          .set('form-data' , form)
                                          .field('name','test product updated')
                                          .field('description' , 'test')
                                          .field('price',10)
                                          .field('subcategory', '5e9611dbb95a645f9804c3f1')
                                          .field('quantity', 1)
                                          .field('zipcode', 52402)
                                          .field('shipping','true')
                                          .attach('photo','./buffer/table_01.jpeg')
                                          .field('fromDate', '2020-04-20')
                                          .field('toDate','2020-05-20')
                                          .expect(response => {
                                          expect(response.status).toBe(200)})
    });
    /**
     * Test case to get or display the updated product
     */
    it('can get a product' , async() =>{
                       await request.get('/api/product/'+duplicateProduct._id)
                                    .send()
                                    .expect(response => {
                                      expect(response.status).toBe(200)
                                    })
    })
    /**
     * Test case for failure of get or display the updated product
     */
    it('can get a product - failure' , async() =>{
                       await request.get('/api/product/dummy_id')
                                    .send()
                                    .expect(response => {
                                      expect(response.status).toBe(400)
                                    })
    })
    
    /**
     * test case for deletion for failure 
     * deleting a product by a product that doesn't exist
     */
    it('can delete a product - when the product does not exist', async() => {
      const product_id = 'dummy'
      await request.delete('/api/product/'+product_id)
                                .set('x-auth-token', token)
                                .send()
                                .expect(response => {
                                  expect(response.status).toBe(400)
                                })
    });
    
    /**
     * test case for deletion - when both user and product exist
     */
    it('can delete a product', async() => {
      const product = await Product.findById(duplicateProduct._id)
      const response = await request.delete('/api/product/'+product._id)
                                .set('x-auth-token', token)
                                .send()
        return expect(JSON.stringify(response.body)).toMatch('product deleted successfully')
    });
    
     

})