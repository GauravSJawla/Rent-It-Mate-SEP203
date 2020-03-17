// const Product = require('../models/Product');
// const config = require('config');
// const expect = require('expect');
// const MongoClient = require('mongodb');
// const supertest = require('supertest');
// const app = require('../server');
// const request = supertest(app);

// describe(' test add a product ', () => {
//     const mongoUri = config.get('mongoURI');
//     let connection;
//     beforeAll( async() => {
//         connection = await MongoClient.connect(mongoURI, {useNewUrlParser: true,
//             useUnifiedTopology: true});
//         const dummyProduct = await Product.findOne({ product_id: "P001"})
//         if (dummyProduct){
//             await Product.deleteOne(dummyProduct);
//         }
//     });
//     afterAll( () => {
//         connection.close();
//         request.close();
//         app.destroy();
//     })

//     it(' can create a product in database' , async() =>{
//         const response = await request.post('/api/product')
//         .send({
            
//         })
//     })
// });