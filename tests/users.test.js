const User = require('../models/Users');
const expect = require('expect');
const MongoClient = require('mongodb');
const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);


describe('test user sign up', () => {
    const mongoURI = "mongodb+srv://GauravSJ:Gaurav123@rentitmate-cluster-pgs7u.mongodb.net/test?retryWrites=true&w=majority";
     let connection, server;
     beforeAll( async() => {
        connection = await MongoClient.connect(mongoURI, {useNewUrlParser: true,
            useUnifiedTopology: true});
        const duplicateUser = await User.findOne({email : "test@gmail.com"})
        if (duplicateUser){
             await User.deleteOne(duplicateUser);
        }
     });
    afterAll( () => {
        connection.close();
        request.close();
    });
    it('can create an user in the database', async () => {
       const response = await request.post('/api/users')
       .send({
           name : 'Test',
           username : 'TestUser',
           email : 'test@gmail.com',
           password : 'test'

       }).expect(200);
       const user = await User.findOne({email: 'test@gmail.com'});
       expect(user.name).toBeTruthy();
       return expect(user.email).toBeTruthy();
    })
    it('should give an error on duplicate user entry', async () => {
        const response = await request.post('/api/users')
        .send({
            name : 'Test',
            username : 'TestUser',
            email : 'test@gmail.com',
            password : 'test'
 
        }).expect(400);
        return expect(JSON.stringify(response.body)).toMatch("User already exists");
             
     })
});
