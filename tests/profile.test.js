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
    let connection,token, id, userId;
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

    it('can create an user in the database', async () => {
      const response = await request.post('/api/users')
      .send({
          name : 'Test',
          username : 'TestUser1',
          email : 'testttuser@gmail.com',
          password : 'test'

      }).expect(200);
    });
    it('can get token', async () => {
        response = await request
          .post('/api/auth')
          .send({
            username: 'TestUser1',
            password: 'test'
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
        userId = response.body.user;
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

    it('should retrieve the particular profile by corresponding user id', async() => {
      const response = await request.get('/api/profile/admin/' + userId).expect(200);
      return expect(JSON.stringify(response.body)).toMatch('\"address1\":\"Quail Hollow\"');
    })

    it('should  not retrieve the particular profile by corresponding user id', async() => {
      const response = await request.get('/api/profile/admin/555566667777').expect(400);
      return expect(JSON.stringify(response.body)).toMatch('Profile not found');
    })

    it('should delete the profile', async() => {
      const response = await request.delete('/api/profile').
                                  set('x-auth-token',token).
                                  expect(200);
      return expect(JSON.stringify(response.body)).toMatch('User removed');
    })

    it('should not let normal users to access the list of all profiles', async() => {
      const response = await request.post('/api/auth')
                      .send({
                          username:'mercy',
                          password:'gentle'
                      }).expect(200);
     const token = response.body.token;
     const res = await request.get('/api/profile').
                 set('x-auth-token', token).expect(400);
     return expect(JSON.stringify(res.body)).toMatch('Access is allowed only to admin');

  } )

  it('should let admin to access the list of all profiles', async() => {
    const response = await request.post('/api/auth')
                    .send({
                        username:'admin',
                        password:'admin'
                    }).expect(200);
   const token = response.body.token;
   const res = await request.get('/api/profile').
               set('x-auth-token', token).expect(200);
   return expect(JSON.stringify(res.body)).toMatch('address');

} )

    

    
})
