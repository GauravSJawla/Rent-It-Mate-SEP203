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

    it('should give yet to create profile if no profile', async() => {
        const duplicateProfile = await Profile.findOne({user:id});
          if (duplicateProfile){
              await Profile.deleteOne(duplicateProfile);
          }
          const response = await request.get('/api/profile/me')
                                      .set('x-auth-token', token).expect(400);
          return expect(JSON.stringify(response.body)).toMatch('You are yet to create your profile');
    })

    it('can create a profile', async() => {
        const user = await User.findOne({username:'mercy'});
        id = user.id;
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

    it('throw validation errors on invalid entry', async() => {
      const response = await request.post('/api/profile')
                                .set('x-auth-token', token)
                                .send({
                                  "address1" : "",
	                                "address2" : "",
	                                "city" : "Cedar rapids",
	                                "state" : "iowa",
	                                "country": "USA",
	                                "zipcode" : 52402,
	                                "homePhone": 8888899999,
	                                "mobilePhone" : 1234567890,
	                                "alternateEmail":"yyy@xxx.com",
	                                "role" : "user"
                                });
      return expect(JSON.stringify(response.error));
    })

    it('should delete the profile', async() => {
      const response = await request.delete('/api/profile').
                                  set('x-auth-token',token).
                                  expect(200);
      return expect(JSON.stringify(response.body)).toMatch('User removed');
    })

    

    
})
