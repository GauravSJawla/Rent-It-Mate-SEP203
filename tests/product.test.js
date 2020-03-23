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
              category : '5e69c7e27cd0040a7a1c0d7e',
              quantity : 1,
              shipping : true,
              username :'5e7920901c9d44000040af6a'
            })
        if(duplicateProduct){
          console.log('inside delete')
             await Product.deleteOne(duplicateProduct);
            }
     });
     beforeEach(() => {
      jest.setTimeout(10000);
    });
     afterAll( () => {
        connection.close();
        request.close();
    });
    it('can get token', async () => {
        const response = await request
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

    it('can create a product', async() => {
      //creating a product in form
      var form = new FormData();
       const response = await request.post('/api/product/create')
                                          .set('x-auth-token' , token)
                                          .set('form-data' , form)
                                          .field('name','test product')
                                          .field('description' , 'test')
                                          .field('price',10)
                                          .field('category', '5e69c7e27cd0040a7a1c0d7e')
                                          .field('quantity', 1)
                                          .field('shipping','true')
                                          .field('username' , '5e7920901c9d44000040af6a')
                                          .attach('photo','./buffer/table.jpeg')
                                          .expect(response => {
                                          expect(response.status).toBe(200)})
    return expect(JSON.stringify(response.body)).toMatch('test product')
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
        category : '5e69c7e27cd0040a7a1c0d7e',
        quantity : 1,
        shipping : true,
        username :'5e7920901c9d44000040af6a'
      })
       const response = await request.put('/api/product/'+duplicateProduct._id)
                                          .set('x-auth-token' , token)
                                          .set('form-data' , form)
                                          .field('name','test product updated')
                                          .field('description' , 'test')
                                          .field('price',10)
                                          .field('category', '5e69c7e27cd0040a7a1c0d7e')
                                          .field('quantity', 1)
                                          .field('shipping','true')
                                          .field('username' , '5e7920901c9d44000040af6a')
                                          .attach('photo','./buffer/table_01.jpeg')
                                          .expect(response => {
                                          expect(response.status).toBe(200)})
    });
    /**
     * Test case to get or display the updated product
     */
    it('can get a product' , async() =>{
      console.log(duplicateProduct._id +' the id is')
                       await request.get('/api/product/'+duplicateProduct._id)
                                    .send()
                                    .expect(response => {
                                      expect(response.status).toBe(200)
                                    })
    })
    /**
     * test case for deletion
     */
    it('can delete a product', async() => {
      jest.setTimeout(1000)
      const product = await Product.findById(duplicateProduct._id)
      const unm = 'mercy'
      const response = await request.delete('/api/product/'+product._id+'/'+unm)
                                .set('x-auth-token', token)
                                .send()
        return expect(JSON.stringify(response.body)).toMatch('product deleted successfully')
    });
    

})