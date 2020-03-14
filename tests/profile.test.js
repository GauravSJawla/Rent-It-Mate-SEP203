const Profile = require('../models/Profile');
const User = require('../models/Users');
const config = require('config');
const expect = require('expect');
const MongoClient = require('mongodb');
const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);

describe('user create/update/delete profile', () => {
    const mongoURI = config.get('mongoURI');
    let connection,token, id;
    beforeAll( async() => {
        connection = await MongoClient.connect(mongoURI, {useNewUrlParser: true,
            useUnifiedTopology: true});
        //server = app.listen(done);
     });
     afterAll( () => {
        connection.close();
        request.close();
        app.destroy();
    });
    it('can get token', async () => {
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

    it('can create a profile', async() => {
        const duplicateProfile = await Profile.findOne({user:id});
        if (duplicateProfile){
            await Profile.deleteOne(duplicateProfile);
        }
        const response = await request.post('/api/profile')
                                .set('x-auth-token', token)
                                .send({
                                    "address1" : "pinehurst drive",
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
        return expect(JSON.stringify(response.body)).toMatch("pinehurst drive"); 
    })

    it('can update a profile', async() => {
        const response = await request.post('/api/profile')
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
})
