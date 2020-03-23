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

describe('product create/update/delete product', () => {
    const mongoURI = config.get('mongoURI');
    let connection,token, id;

    beforeAll( async() => {
        connection = await MongoClient.connect(mongoURI, {useNewUrlParser: true,
            useUnifiedTopology: true});
        let duplicateProduct = await Product.findOne({
              name : 'test product',
              description :'test',
              price : 10,
              category : '5e69c7e27cd0040a7a1c0d7e',
              quantity : 1,
              shipping : true,
              username :'5e7920901c9d44000040af6a'
            })
          console.log(duplicateProduct+'test ')
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

    it('can delete a product', async() => {
      jest.setTimeout(1000)
       const product = await Product.findOne({
        name : 'test product',
        description :'test',
        price : 10,
        category : '5e69c7e27cd0040a7a1c0d7e',
        quantity : 1,
        shipping : true,
        username: '5e7920901c9d44000040af6a'
      })
      const unm = 'mercy'
        const response = await request.delete('/api/product/'+product._id+'/'+unm)
                                .set('x-auth-token', token)
                                .send()
        return expect(JSON.stringify(response.body)).toMatch('product deleted successfully')
    });

})