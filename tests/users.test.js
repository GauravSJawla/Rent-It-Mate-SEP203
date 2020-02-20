const userRoute = require('../routes/api/users');
const User = require('../models/Users');
const expect = require('expect');
const MongoClient = require('mongodb');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);


describe('test user sign up', () => {
    const mongoURI = "mongodb+srv://GauravSJ:Gaurav123@rentitmate-cluster-pgs7u.mongodb.net/test?retryWrites=true&w=majority";
     let connection;
     let db;
     beforeAll(async() => {
        connection = await MongoClient.connect(mongoURI, {useNewUrlParser: true,
            useUnifiedTopology: true});
        // db = await connection.db('test');
        // console.log(db);
     });
    afterAll(async() => {
        await connection.close();
        await db.close();
    });
    it('can create an user in the database', async (done) => {
       const response = await request.post('/api/users')
       .send({
           name : 'Test',
           username : 'TestUser',
           email : 'test@gmail.com',
           password : 'test'

       }).expect(200);
       const user = await User.findOne({email: 'test@gmail.com'});
       expect(user.name).toBeTruthy();
       expect(user.email).toBeTruthy();
       done();
    })
});
