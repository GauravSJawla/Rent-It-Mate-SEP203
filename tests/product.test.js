const Product = require('../models/Product');
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
     });
     afterAll( () => {
        connection.close();
        request.close();
        app.destroy();
    });
    it('can get token', async () => {
      jest.setTimeout(10000);
        response = await request
          .post('/api/auth')
          .send({
            username: 'mercy',
            password: 'gentle'
          })
          .expect(200);
        token = response.body.token;
        id = response.body.id;
        if (token) {
          return expect(token).toBeTruthy();
        }
        return expect(token).toBeTruthy();
      });

    // it('can create a product', async() => {
    //   jest.setTimeout(10000);
    //   //creating a product in form
    //   var form = new FormData();
    //   form.append('name' , 'test product');
    //   form.append('description' , 'test')
    //   form.append('price',10)
    //   form.append('category', '5e69c7e27cd0040a7a1c0d7e')
    //   form.append('quantity', 1)
    //   form.append('shipping','true')
    //   form.append('photo', fs.createReadStream('/buffer/table.jpeg'))
    //   console.log(token)
    //    const response = await request.post('/api/product/create')
    //                                  .set('x-auth-token' , token)
    //                                  .set('form-data' , form)
    //                                 //  .field('description' , 'test')
    //                                 //  .field('price',10)
    //                                 //  .field('category', '5e69c7e27cd0040a7a1c0d7e')
    //                                 //  .field('quantity', 1)
    //                                 //  .field('shipping','true')
    //                                  .attach('file','./buffer/table.jpeg')
    //                                  .expect(response => {
    //                                   expect(response.status).toBe(200)})
                                     
    //   return expect(JSON.stringify(response.body)).toMatch('test product')
    // })

    it('can delete a product', async() => {
        const response = await request.delete('/api/product')
                                .query({
                                  productId : ''
                                })
                                .set('x-auth-token', token)
                                .send({
                                    "address1" : "Quail Hollow",
	                                "address2" : "",
	                                "city" : "Cedar rapids",
	                                "state" : "iowa",
	                                "country": "USA",
	                                "zipcode" : 52402,
	                                "homePhone": 8888899999,
	                                "mobilePhone" : 1234567890,
	                                "alternateEmail":"yyy@xxx.com",
	                                "role" : "user"
                                }).expect(200);
        return expect(JSON.stringify(response.body)).toMatch("Quail Hollow"); 
    })

    // it('throw validation errors on invalid entry', async() => {
    //   const response = await request.post('/api/profile')
    //                             .set('x-auth-token', token)
    //                             .send({
    //                               "address1" : "",
	//                                 "address2" : "",
	//                                 "city" : "Cedar rapids",
	//                                 "state" : "iowa",
	//                                 "country": "USA",
	//                                 "zipcode" : 52402,
	//                                 "homePhone": 8888899999,
	//                                 "mobilePhone" : 1234567890,
	//                                 "alternateEmail":"yyy@xxx.com",
	//                                 "role" : "user"
    //                             });
    //   return expect(JSON.stringify(response.error));
    // })

    // it('should give yet to create profile if no profile', async() => {
    //   const duplicateProfile = await Profile.findOne({user:id});
    //     if (duplicateProfile){
    //         await Profile.deleteOne(duplicateProfile);
    //     }
    //     const response = await request.get('/api/profile/me')
    //                                 .set('x-auth-token', token).expect(400);
    //     return expect(JSON.stringify(response.body)).toMatch('You are yet to create your profile');
    // })
})