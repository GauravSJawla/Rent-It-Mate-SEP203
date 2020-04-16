const SubCategory = require("../models/SubCategory");
const Product = require('../models/Product');
const config = require("config");
const expect = require("expect");
const MongoClient = require("mongodb");
const supertest = require("supertest");
const app = require("../server");
const request = supertest(app);
const FormData = require('formidable')

describe("create/read/update/delete sub-category", () => {
  const mongoURI = config.get("mongoURI");
  let connection, token;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const duplicateSubCategory = await SubCategory.findOne({
      name: "test subcategory3",
      categoryId: "5e85f16ed9b2304e2884144a",
    });

    if (duplicateSubCategory) {
      await SubCategory.deleteOne(duplicateSubCategory);
    }

    const duplicateSubCategory2 = await SubCategory.findOne({
      name: "test subcategory2",
      categoryId: "5e85f16ed9b2304e2884144a",
    });

    if (duplicateSubCategory2) {
      await SubCategory.deleteOne(duplicateSubCategory2);
    }
  });

  afterAll(() => {
    connection.close();
    request.close();
    app.destroy();
  });

  it("can get the token", async () => {
    response = await request
      .post("/api/auth")
      .send({
        username: "admin",
        password: "admin",
      })
      .expect(200);
    token = response.body.token;
    id = response.body.id;
    if (token) {
      return expect(token).toBeTruthy();
    }
    return expect(token).toBeTruthy();
  });

  it("can create a sub-category", async () => {
    const response = await request
      .post("/api/subcategory")
      .set("x-auth-token", token)
      .send({
        name: "test subcategory2",
        categoryId: "5e85f16ed9b2304e2884144a",
      })
      .expect(200);

    return expect(JSON.stringify(response.body)).toMatch("test subcategory2");
  });

  it("cannot create a sub-category if no parent category", async () => {
    const response = await request
      .post("/api/subcategory")
      .set("x-auth-token", token)
      .send({
        name: "test subcategory2",
        categoryId: "5e85f16ed9b2304e2884144",
      })
      .expect(400);

    return expect(JSON.stringify(response.body)).toMatch(
      "Parent Category not found! Please Create A Category First!"
    );
  });

  it("should give sub-category already exists if duplicate sub-category", async () => {
    const response = await request
      .post("/api/subcategory")
      .set("x-auth-token", token)
      .send({
        name: "test subcategory2",
        categoryId: "5e85f16ed9b2304e2884144a",
      })
      .expect(400);

    return expect(JSON.stringify(response.body)).toMatch(
      "Sub-Category already exists! Update it!"
    );
  });

  it("can get all sub-categories", async () => {
    const response = await request
      .get("/api/subcategory")
      .set("x-auth-token", token)
      .expect(200);

    return expect(JSON.stringify(response.body));
  });

  it("can get a sub-category by the sub-category ID", async () => {
    const subcategory = await SubCategory.findOne({
      name: "test subcategory2",
    });
    const response = await request
      .get("/api/subcategory/" + subcategory._id)
      .set("x-auth-token", token)
      .expect(200);

    return expect(JSON.stringify(response.body));
  });

  it("cannot get a sub-category by a wrong sub-category ID", async () => {
    const response = await request
      .get("/api/subcategory/123abc")
      .set("x-auth-token", token)
      .expect(400);

    return expect(JSON.stringify(response.body)).toMatch(
      "Sub-Category not found!"
    );
  });

  it("should give the sub-category not found error if no specified sub-category present", async () => {
    const subcategory_id = "dummy";
    const response = await request
      .get("/api/subcategory/" + subcategory_id)
      .set("x-auth-token", token)
      .expect(400);

    return expect(JSON.stringify(response.body)).toMatch(
      "Sub-Category not found!"
    );
  });

  it("should update a sub-category by the sub-category ID", async () => {
    const subcategory = await SubCategory.findOne({
      name: "test subcategory2",
    });
    const response = await request
      .post("/api/subcategory/" + subcategory._id)
      .set("x-auth-token", token)
      .send({
        name: "test subcategory3",
        categoryId: subcategory.categoryId,
      })
      .expect(200);

    return expect(JSON.stringify(response.body)).toMatch("test subcategory3");
  });

  it('should not delete a subcategory if there are products to it', async() => {
    const subCategory = await SubCategory.findOne({ name: 'test subcategory3' });
    var form = new FormData();
    const productRes = await request.post('/api/product/create')
                            .set('x-auth-token',token)
                            .set('form-data', form)
                            .field('name','tp')
                            .field('description','test')
                            .field('price',11)
                            .field('subcategory',`${subCategory._id}`)
                            .field('quantity',1)
                            .field('shipping',false)
                            .expect(200);
    const res = await request.delete('/api/subcategory/' + subCategory._id)
                            .set('x-auth-token',token)
    return expect(JSON.stringify(res.body))
                    .toMatch('Subcategory cannot be deleted');
  
  })

  it("should delete a sub-category by the sub-category ID", async () => {
    const subcategory = await SubCategory.findOne({
      name: "test subcategory3",
    });
    await Product.deleteMany({subcategory:subcategory._id})
    // const subcategoryName = subcategory.name;
    const response = await request
      .delete("/api/subcategory/" + subcategory._id)
      .set("x-auth-token", token)
      .expect(200);

    return expect(JSON.stringify(response.body)).toMatch(
      "Sub-Category has been deleted"
    );
  });
});
