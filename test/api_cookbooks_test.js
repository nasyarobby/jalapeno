process.env.NODE_ENV = "test"

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const should = chai.should();

const App = require("../app");
const agent = chai.request(App).keepOpen();
const knex = require("../knex");
const TokenGenerator = require("./tokenGenerator");
const token = TokenGenerator.get();

// VALID DATA
// COOKBOOK
let data = {
    cookbook: {
        name: "Cookbook ABC",
        category: "Category XYZ"
    },
    updatedCookbook: {
        name: "Cookbook DEF",
        category: "Category 123"
    }
}

describe("Cookbook API Routes", function () {

    beforeEach(function (done) {
        knex.migrate.rollback()
            .then(function () {
                return knex.migrate.latest()
            })
            .then(function () {
                return knex.seed.run()
            })
            .then(() => {
                done();
            })
            .catch((err) => {
                done(err)
            })
    })

    afterEach(function (done) {
        knex.migrate.rollback()
            .then(function () {
                done();
            })
            .catch((err) => {
                done(err)
            })

    });

    /*
    Return the cookbooks, from the recent one to oldest one.
    ENDPOINT: GET /api/cookbooks

    EXAMPLE RESPONSE
    response: {
        status: 200,
        data: {
            cookbooks: [
                {
                    id: 2
                    name: "Cookbook Name here",
                    numOfRecipes: 4,
                    createdAt: date,
                    updatedAt: date,
                    owner: {
                        id: 1,
                        name: "Robby D"
                    },
                    category: "Category here"
                },
                {
                    id: 1
                    name: "Another Cookbook Name here",
                    numOfRecipes: 2,
                    createdAt: date,
                    updatedAt: date,
                    owner: {
                        id: 1,
                        name: "Robby D"
                    },
                    category: "Category here"
                }
            ]
        }
    }
    */
    context("GET /api/cookbooks/", function () {
        it("should return all cookbooks", function (done) {
            agent
                .get("/api/cookbooks/")
                .end((err, res) => {
                    if (err)
                        done(err);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.data.cookbooks.should.be.an("array");
                    res.body.data.cookbooks.length.should.equals(4);
                    res.body.data.cookbooks[0].id.should.equals(4);
                    res.body.data.cookbooks[0].name.should.equals('A Taste of the World');
                    res.body.data.cookbooks[0].category.should.equals('International');
                    res.body.data.cookbooks[0].numOfRecipes.should.equals(7)
                    res.body.data.cookbooks[0].should.have.property("createdAt");
                    res.body.data.cookbooks[0].should.have.property("updatedAt");
                    res.body.data.cookbooks[0].owner.id.should.equal(1);
                    res.body.data.cookbooks[0].owner.name.should.equal("Alice Peace");
                    res.body.data.cookbooks[0].owner.should.not.have.property("password");
                    done();
                })
        })
    })
    context("GET /api/cookbooks/recent/:num", function () {

        it("num=2 should return 2 recent cookbooks.", function (done) {
            agent
                .get("/api/cookbooks/recent/2")
                .end((err, res) => {
                    if (err)
                        done(err);

                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.data.cookbooks.should.be.an("array");
                    res.body.data.cookbooks.length.should.equals(2);
                    res.body.data.cookbooks[0].id.should.equals(4);
                    res.body.data.cookbooks[1].id.should.equals(3);
                    res.body.data.cookbooks[0].name.should.equals('A Taste of the World');
                    res.body.data.cookbooks[0].category.should.equals('International');
                    res.body.data.cookbooks[0].numOfRecipes.should.equals(7)
                    res.body.data.cookbooks[0].should.have.property("createdAt");
                    res.body.data.cookbooks[0].should.have.property("updatedAt");
                    res.body.data.cookbooks[0].owner.id.should.equal(1);
                    res.body.data.cookbooks[0].owner.name.should.equal("Alice Peace");
                    res.body.data.cookbooks[0].owner.should.not.have.property("password");
                    done();
                })
        })

        it("num=a should return error", function (done) {
            agent.get("/api/cookbooks/recent/a")
                .end((err, res) => {
                    if (err)
                        done(err);

                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.status.should.equals("fail");
                    res.body.data.numOfCookbooks[0].message.should.equal("Number of Cookbooks is invalid or missing.");
                    done();
                })
        })

        it("num= (empty) should return 4 recent cookbooks (default number)", function (done) {
            agent.get("/api/cookbooks/recent/")
                .end((err, res) => {
                    if (err)
                        done(err);

                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.status.should.equals("success")
                    res.body.data.cookbooks.should.be.an("array");
                    res.body.data.cookbooks.length.should.equals(4);
                    res.body.data.cookbooks[0].id.should.equals(4);
                    res.body.data.cookbooks[0].name.should.equals('A Taste of the World');
                    res.body.data.cookbooks[0].category.should.equals('International');
                    res.body.data.cookbooks[0].numOfRecipes.should.equals(7)
                    res.body.data.cookbooks[0].should.have.property("createdAt");
                    res.body.data.cookbooks[0].should.have.property("updatedAt");
                    res.body.data.cookbooks[0].owner.id.should.equal(1);
                    res.body.data.cookbooks[0].owner.name.should.equal("Alice Peace");
                    res.body.data.cookbooks[0].owner.should.not.have.property("password");
                    done();
                })
        })
    })

    context("GET /api/cookbooks/user/:uid", function () {
        it("uid=alice001 should return Alice's cookbooks", function (done) {
            agent
                .get("/api/cookbooks/user/alice001")
                .end((err, res) => {
                    if (err)
                        done(err);

                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.data.cookbooks.should.be.an("array");
                    res.body.data.cookbooks.length.should.equal(2);
                    res.body.data.cookbooks[0].id.should.equal(4);
                    res.body.data.cookbooks[0].numOfRecipes.should.equal(7);
                    res.body.data.cookbooks[0].should.have.property("name");
                    res.body.data.cookbooks[0].should.have.property("category");
                    res.body.data.cookbooks[0].should.have.property("owner");
                    res.body.data.cookbooks[0].should.have.property("createdAt");
                    res.body.data.cookbooks[0].should.have.property("updatedAt");
                    res.body.data.cookbooks[0].owner.id.should.equal(1);
                    res.body.data.cookbooks[0].owner.name.should.equal("Alice Peace");
                    res.body.data.cookbooks[0].owner.name.should.not.have.property("password");
                    res.body.data.cookbooks[1].id.should.equal(1);
                    res.body.data.owner.id.should.equals(1);
                    res.body.data.owner.name.should.equals("Alice Peace")
                    res.body.data.owner.should.not.have.property("password");
                    done();
                })
        })
    })

    context("GET /cookbooks/id/:cid", function () {
        it("cid=4 should return list of recipes of a cookbok with id 4", function (done) {
            agent
                .get("/api/cookbooks/id/4")
                .end((err, res) => {
                    if (err)
                        done(err);

                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.data.id.should.equal(4);
                    res.body.data.name.should.equals("A Taste of the World");
                    res.body.data.should.have.property("category");
                    res.body.data.should.have.property("createdAt");
                    res.body.data.should.have.property("updatedAt");

                    res.body.data.recipes.should.be.an("array");
                    res.body.data.recipes.length.should.equal(7);

                    res.body.data.recipes[0].should.have.property("id");
                    res.body.data.recipes[0].should.have.property("recipe_name");
                    res.body.data.recipes[0].should.have.property("description");
                    res.body.data.recipes[0].should.have.property("directions");
                    res.body.data.recipes[0].should.have.property("preparationTime");
                    res.body.data.recipes[0].should.have.property("cookTime");
                    res.body.data.recipes[0].should.have.property("portions");
                    res.body.data.recipes[0].should.have.property("notes");
                    res.body.data.recipes[0].categories.should.be.an('array');
                    res.body.data.recipes[0].ingredients.should.be.an('array');
                    // not gonna test the content of the ingredients
                    res.body.data.owner.id.should.equal(1);
                    res.body.data.owner.name.should.equal("Alice Peace");
                    res.body.data.owner.should.not.have.property("password");

                    done();
                })
        })
    })

    context("GET /recipes/:rid", function () {
        it("rid=1 should return content of a recipe id 1", function (done) {
            agent
                .get("/api/recipes/1")
                .end((err, res) => {
                    if (err)
                        done(err);

                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.data.should.have.property("id");
                    res.body.data.id.should.equal(1);
                    res.body.data.should.have.property("name");
                    res.body.data.name.should.equals("Fresh Tomato Salad");
                    res.body.data.should.have.property("description");
                    res.body.data.should.have.property("directions");
                    res.body.data.should.have.property("preparationTime");
                    res.body.data.preparationTime.should.equal("10 min");
                    res.body.data.should.have.property("cookTime");
                    res.body.data.cookTime.should.equal("0 min");
                    res.body.data.should.have.property("portions");
                    res.body.data.portions.should.equal(4);
                    res.body.data.should.have.property("notes");
                    res.body.data.notes.should.equal("Great to put in the fridge!");
                    res.body.data.categories.should.be.an('array');
                    res.body.data.categories.length.should.equal(1);
                    res.body.data.categories[0].name.should.equal("Salad");

                    res.body.data.ingredients.should.be.an('array');
                    res.body.data.ingredients.length.should.equal(8);
                    res.body.data.ingredients[0].should.have.property("quantity");
                    res.body.data.ingredients[0].should.have.property("quantity_text");
                    res.body.data.ingredients[0].should.have.property("unit");
                    // name is ingredient_name in the database
                    res.body.data.ingredients[0].should.have.property("name");
                    res.body.data.ingredients[0].name.should.equal("Grape Tomatoes");

                    res.body.data.should.have.property("createdAt");
                    res.body.data.should.have.property("updatedAt");

                    //cookbooks should be an array because its many to many relation
                    res.body.data.cookbooks.should.be.an("array");
                    res.body.data.cookbooks[0].name.should.equal("Watching My Figure");

                    res.body.data.cookbooks[0].owner.id.should.equal(1);
                    res.body.data.cookbooks[0].owner.name.should.equal("Alice Peace");
                    res.body.data.cookbooks[0].owner.should.not.have.property("password");

                    done();
                })
        })
    })

    context("PUT /api/cookbooks", function () {
        it("creates new cookbooks.", function (done) {
            agent
                .put("/api/cookbooks")
                .set({
                    "Authorization": "Bearer " + token
                })
                .send(data.cookbook)
                .end((err, res) => {
                    if (err)
                        done(err);

                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.status.should.equals("success");
                    res.body.data.id.should.equals(5);
                    res.body.data.name.should.equal("Cookbook ABC");
                    res.body.data.category.should.equal("Category XYZ");
                    res.body.data.owner.name.should.equal("Alice Peace");
                    res.body.data.owner.id.should.equal(1);
                    res.body.data.should.have.property("createdAt");
                    done();
                })
        })
    })
    context("PUT /api/cookbooks/id/:id", function () {
        it("updates the cookbook.", function (done) {
            agent
                .put("/api/cookbooks/id/1")
                .set({
                    "Authorization": "Bearer " + token
                })
                .send(data.updatedCookbook)
                .end((err, res) => {
                    if (err)
                        done(err);

                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.status.should.equals("success");
                    res.body.data.id.should.equals(1);
                    res.body.data.name.should.equal("Cookbook DEF");
                    res.body.data.category.should.equal("Category 123");
                    res.body.data.owner.name.should.equal("Alice Peace");
                    res.body.data.owner.id.should.equal(1);
                    res.body.data.should.have.property("createdAt");
                    res.body.data.should.have.property("updatedAt");
                    done();
                })
        })

        it("updates the cookbook (only name).", function (done) {
            let updateData = Object.assign({}, data.updatedCookbook);
            delete updateData.category;

            agent
                .put("/api/cookbooks/id/1")
                .set({
                    "Authorization": "Bearer " + token
                })
                .send(updateData)
                .end((err, res) => {
                    if (err)
                        done(err);

                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.status.should.equals("success");
                    res.body.data.id.should.equals(1);
                    res.body.data.name.should.equal("Cookbook DEF");
                    res.body.data.category.should.equal("Healthy");
                    res.body.data.owner.name.should.equal("Alice Peace");
                    res.body.data.owner.id.should.equal(1);
                    res.body.data.should.have.property("createdAt");
                    res.body.data.should.have.property("updatedAt");
                    done();
                })
        })

        it("updates the cookbook (only category).", function (done) {
            let updateData = Object.assign({}, data.updatedCookbook);
            delete updateData.name;

            agent
                .put("/api/cookbooks/id/1")
                .set({
                    "Authorization": "Bearer " + token
                })
                .send(updateData)
                .end((err, res) => {
                    if (err)
                        done(err);

                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.status.should.equals("success");
                    res.body.data.id.should.equals(1);
                    res.body.data.name.should.equal("Watching My Figure");
                    res.body.data.category.should.equal("Category 123");
                    res.body.data.owner.name.should.equal("Alice Peace");
                    res.body.data.owner.id.should.equal(1);
                    res.body.data.should.have.property("createdAt");
                    res.body.data.should.have.property("updatedAt");
                    done();
                })
        })
    })

    context("PUT /api/recipes", function () {
        it("create a new recipe.", function (done) {
            let data = {
                name: "Cake 101",
                description: "Some long description.",
                directions: "some direction",
                preparationTime: 10,
                preparationTimeUnit: "hour",
                cookTime: 0,
                cookTimeUnit: "minute",
                portions: 4,
                notes: "Some notes",
                ingredients: [{
                        name: "Unknown Ing",
                        quantity: 0.25,
                        quantity_text: "1/4",
                        unit: "cups"
                    },
                    {
                        name: "Salt",
                        quantity: 1,
                        quantity_text: "",
                        unit: "to taste"
                    },
                ],
                cookbookId: [{id: 1}],
                categories: [2]
            }

            agent
                .put("/api/recipes")
                .set({
                    "Authorization": "Bearer " + token
                })
                .send(data)
                .end((err, res) => {
                    if (err)
                        done(err);

                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.data.should.have.property("id");
                    res.body.data.id.should.equal(17);
                    res.body.data.should.have.property("name");
                    res.body.data.name.should.equals(data.name);
                    res.body.data.should.have.property("description");
                    res.body.data.description.should.equals(data.description);
                    res.body.data.should.have.property("directions");
                    res.body.data.directions.should.equals(data.directions);
                    res.body.data.should.have.property("preparationTime");
                    res.body.data.preparationTime.should.equal("10 hour");
                    res.body.data.should.have.property("cookTime");
                    res.body.data.cookTime.should.equal("0 minute");
                    res.body.data.should.have.property("portions");
                    res.body.data.portions.should.equal(4);
                    res.body.data.should.have.property("notes");
                    res.body.data.notes.should.equal(data.notes);
                    res.body.data.categories.should.be.an('array');
                    res.body.data.categories.length.should.equal(1);
                    res.body.data.categories[0].name.should.equal("Drink");

                    res.body.data.ingredients.should.be.an('array');
                    res.body.data.ingredients.length.should.equal(2);
                    res.body.data.ingredients[0].should.have.property("quantity");
                    res.body.data.ingredients[0].id.should.equal(76);
                    res.body.data.ingredients[0].should.have.property("quantity_text");
                    res.body.data.ingredients[0].should.have.property("unit");
                    // name is ingredient_name in the database
                    res.body.data.ingredients[0].should.have.property("name");
                    res.body.data.ingredients[0].name.should.equal(data.ingredients[0].name);

                    res.body.data.ingredients[1].id.should.equal(76);

                    res.body.data.should.have.property("createdAt");

                    //cookbooks should be an array because its many to many relation
                    res.body.data.cookbooks.should.be.an("array");
                    res.body.data.cookbooks[0].name.should.equal("Watching My Figure");

                    res.body.data.cookbooks[0].owner.id.should.equal(1);
                    res.body.data.cookbooks[0].owner.name.should.equal("Alice Peace");
                    res.body.data.cookbooks[0].owner.should.not.have.property("password");

                    done();
                })
        })
    })

    context("PUT /api/recipes/:rid", function () {
        it("updates the recipe.")
    })
})