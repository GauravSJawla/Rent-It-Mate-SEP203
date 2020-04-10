const User = require('../models/Users');
const config = require('config');
const expect = require('expect');
const MongoClient = require('mongodb');
const { MailSlurp } = require('mailslurp-client');
const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);

describe('test user sign up', () => {
  const mongoURI = config.get('mongoURI');
  const mailSlurpAPIKey = config.get('mailSlurpAPIKey');
  const mailslurp = new MailSlurp({ apiKey: mailSlurpAPIKey });
  let inbox, connection, emailAddress, token, server;
  beforeAll(async () => {
    connection = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //server = app.listen(done);
    inbox = await mailslurp.createInbox();
    emailAddress = inbox.emailAddress;
    const duplicateUser = await User.findOne({ username: 'TestUser04' });
    if (duplicateUser) {
      await User.deleteOne(duplicateUser);
    }
  });
  afterAll(async () => {
    const duplicateUser = await User.findOne({ username: 'TestUser04' });
    if (duplicateUser) {
      await User.deleteOne(duplicateUser);
    }
    connection.close();
    request.close();
    app.destroy();

    //server.close(done);
  });
  it('can create an user in the database', async () => {
    const response = await request
      .post('/api/users')
      .send({
        name: 'Test User 4',
        username: 'TestUser04',
        email: emailAddress,
        password: 'test1234',
      })
      .expect(200);
    token = response.body.temporarytoken;
    const email = await mailslurp.waitForLatestEmail(inbox.id);
    //const emailCode = parse(email.subject);
    expect(email.subject).toMatch('Please verify your account');
    return expect(JSON.stringify(response.body)).toMatch('Email sent');
  });
  it('can update user details after successful verification', async () => {
    const newUser = await User.findOne({ email: emailAddress });
    if (newUser) {
      const response = await request.get(
        '/api/users/verify/?id=' + newUser.temporarytoken
      );
      const email = await mailslurp.waitForLatestEmail(inbox.id);
      const user = await User.findOne({ email: emailAddress });
      return expect(user.verifiedStatus).toBe(true);
    }
  });
  it('should return link expired if there is no user', async () => {
    const response = await request.get('/api/users/verify/?id=xxx');
    return expect(JSON.stringify(response.body)).toMatch(
      'Activation Link is expired'
    );
  });

  it('should throw exception if any', () => {
    const t = () => {
      throw new TypeError();
    };
    expect(t).toThrow(TypeError);
  });

  it('should give an error if username already exists', async () => {
    const response = await request
      .post('/api/users')
      .send({
        name: 'Test User 4',
        username: 'TestUser04',
        email: emailAddress + 'a',
        password: 'test1234',
      })
      .expect(400);
    return expect(JSON.stringify(response.body)).toMatch(
      'Username already exists!'
    );
  });

     it('should not let normal users to access the list of all users', async() => {
         const response = await request.post('/api/auth')
                         .send({
                             username:'mercy',
                             password:'gentle'
                         }).expect(200);
        const token = response.body.token;
        const res = await request.get('/api/users').
                    set('x-auth-token', token).expect(400);
        return expect(JSON.stringify(res.body)).toMatch('Access is allowed only to admin');

     } )

     it('should let admin to access the list of all users', async() => {
        const response = await request.post('/api/auth')
                        .send({
                            username:'admin',
                            password:'admin'
                        }).expect(200);
       const token = response.body.token;
       const res = await request.get('/api/users').
                   set('x-auth-token', token).expect(200);
       return expect(JSON.stringify(res.body)).toMatch('username');

    } )


  it('should give an error if email already exists', async () => {
    const response = await request
      .post('/api/users')
      .send({
        name: 'Test User 5',
        username: 'TestUser05',
        email: emailAddress,
        password: 'test12345',
      })
      .expect(400);
    return expect(JSON.stringify(response.body)).toMatch(
      'Email already exists!'
    );
  });
});
