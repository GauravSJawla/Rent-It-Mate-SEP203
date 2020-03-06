const expect = require('expect');
const MongoClient = require('mongodb');
const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);


// connecting the database in the test class
describe('test user sign up', () => {
    const mongoURI = "mongodb+srv://GauravSJ:Gaurav123@rentitmate-cluster-pgs7u.mongodb.net/test?retryWrites=true&w=majority";
     let connection;
     let response;
     let token;
     //executes before all the tests.
     beforeAll( async() => {
        connection = await MongoClient.connect(mongoURI, {useNewUrlParser: true,
            useUnifiedTopology: true});
     });
    afterAll( () => {
        connection.close();
        request.close();
    });
    //checking whether the user gets token on login post request.
    //this test should assert true
    it('can get token', async () => {
        response = await request.post('/api/auth')
        .send({
            username : 'mercy',
            password : 'gentle'
        }).expect(200);
        token = response.body.token;
        if(token){
            return expect(token).toBeTruthy();
        }
        return expect(token).toBeTruthy();
    })
    it('should get the user with token' , async () => {
        response = await request.get('/api/auth')
                                .set('x-auth-token' , token)
                                .expect(200)
        return expect(response.body).toBeTruthy();

    })
                                
});