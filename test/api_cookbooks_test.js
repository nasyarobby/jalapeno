process.env.NODE_ENV = "test"

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const should = chai.should();

const App = require("../app");
const agent = chai.request(App).keepOpen();
const knex = require("../knex");

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
                    res.data.cookbooks.should.be.an("array");
                    res.data.cookbooks.length.should.equals(4);
                    res.data.cookbooks[0].id.shoul.equals(4);
                    res.data.cookbooks[0].name.should.equals('A Taste of the World');
                    res.data.cookbooks[0].category.should.equals('International');
                    res.data.cookbooks[0].numOfRecipes.should.equals(7)
                    res.data.cookbooks[0].should.have.property("createdAt");
                    res.data.cookbooks[0].should.have.property("updatedAt");
                    res.data.cookbooks[0].owner.id.should.equal(1);
                    res.data.cookbooks[0].owner.name.should.equal("Alice Peace");
                    res.data.cookbooks[0].owner.should.not.have.property("password");
                    done();
                })
        })
    })
    context("GET /api/cookbooks/recent/:num", function () {

        it("num=2 should return 2 recent cookbooks.", function (done) {
            agent
                .get("/api/cookbooks/recent/4")
                .end((err, res) => {
                    if (err)
                        done(err);

                    res.should.have.status(200);
                    res.should.be.json;
                    res.data.cookbooks.should.be.an("array");
                    res.data.cookbooks.length.should.equals(2);
                    res.data.cookbooks[0].id.shoul.equals(4);
                    res.data.cookbooks[1].id.shoul.equals(3);
                    res.data.cookbooks[0].name.should.equals('A Taste of the World');
                    res.data.cookbooks[0].category.should.equals('International');
                    res.data.cookbooks[0].numOfRecipes.should.equals(7)
                    res.data.cookbooks[0].should.have.property("createdAt");
                    res.data.cookbooks[0].should.have.property("updatedAt");
                    res.data.cookbooks[0].owner.id.should.equal(1);
                    res.data.cookbooks[0].owner.name.should.equal("Alice Peace");
                    res.data.cookbooks[0].owner.should.not.have.property("password");
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
        it("uid=1 should return Alice's cookbooks", function (done) {
            agent
                .get("/api/cookbooks/user/1")
                .end((err, res) => {
                    if (err)
                        done(err);

                    res.should.have.status(200);
                    res.should.be.json;
                    res.data.cookbooks.should.be.an("array");
                    res.data.cookbooks.length.should.equal(2);
                    res.data.cookbooks[0].id.should.equal(4);
                    res.data.cookbooks[0].numOfRecipes.should.equal(7);
                    res.data.cookbooks[0].should.have.property("name");
                    res.data.cookbooks[0].should.have.property("category");
                    res.data.cookbooks[0].should.have.property("owner");
                    res.data.cookbooks[0].should.have.property("createdAt");
                    res.data.cookbooks[0].should.have.property("updatedAt");
                    res.data.cookbooks[0].owner.id.should.equal(1);
                    res.data.cookbooks[0].owner.name.should.equal("Alice Peace");
                    res.data.cookbooks[0].owner.name.should.not.have.property("password");
                    res.data.cookbooks[1].id.should.equal(1);
                    res.data.owner.id.should.equals(1);
                    res.data.owner.name.should.equals("Alice Peace")
                    res.data.owner.should.not.have.property("password");
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
                    res.data.id.should.equal(4);
                    res.data.name.should.equals("A Taste of the World");
                    res.data.should.have.property("category");
                    res.data.should.have.property("createdAt");
                    res.data.should.have.property("updatedAt");

                    res.data.recipes.should.be.an("array");
                    res.data.recipes.length.should.equal(7);

                    res.data.recipes[0].should.have.property("id");
                    res.data.recipes[0].should.have.property("name");
                    res.data.recipes[0].should.have.property("description");
                    res.data.recipes[0].should.have.property("directions");
                    res.data.recipes[0].should.have.property("preparationTime");
                    res.data.recipes[0].should.have.property("cookTime");
                    res.data.recipes[0].should.have.property("portions");
                    res.data.recipes[0].should.have.property("notes");
                    res.data.recipes[0].categories.should.be.an('array');
                    res.data.recipes[0].ingredients.should.be.an('array');
                    // not gonna test the content of the ingredients
                    res.data.owner.id.should.equal(1);
                    res.data.owner.name.should.equal("Alice Peace");
                    res.data.owner.should.not.have.property("password");

                    done();
                })
        })
    })

    context("GET /recipes/:rid", function () {
        it("rid=1 should return content of a recipe id 1", function (done) {
            agent
                .get("/api/recipes/4")
                .end((err, res) => {
                    if (err)
                        done(err);

                    res.should.have.status(200);
                    res.should.be.json;
                    res.data.should.have.property("id");
                    res.data.id.should.equal(1);
                    res.data.should.have.property("name");
                    res.data.name.should.equals("Fresh Tomato Salad");
                    res.data.should.have.property("description");
                    res.data.should.have.property("directions");
                    res.data.should.have.property("preparationTime");
                    res.data.preparationTime.should.equal("10 min");
                    res.data.should.have.property("cookTime");
                    res.data.cookTime.should.equal("0 min");
                    res.data.should.have.property("portions");
                    res.data.portions.should.equal(4);
                    res.data.should.have.property("notes");
                    res.data.notes.should.equal("Great to put in the fridge!");
                    res.data.categories.should.be.an('array');
                    res.data.categories.length.should.equal(1);
                    res.data.categories[1].name.should.equal("Salad");

                    res.data.ingredients.should.be.an('array');
                    res.data.ingredients.length.should.equal(6);
                    res.data.ingredients[0].should.have.property("quantity");
                    res.data.ingredients[0].should.have.property("quantityText");
                    res.data.ingredients[0].should.have.property("unit");
                    // name is ingredient_name in the database
                    res.data.ingredients[0].should.have.property("name");
                    res.data.ingredients[0].name.should.equal("Grape Tomatoes");

                    res.data.should.have.property("createdAt");
                    res.data.should.have.property("updatedAt");

                    //cookbooks should be an array because its many to many relation
                    res.data.cookbooks.should.be.an("array");
                    res.data.cookbooks[0].name.should.equal("Watching My Figure");

                    res.data.cookbooks[0].owner.id.should.equal(1);
                    res.data.cookbooks[0].owner.name.should.equal("Alice Peace");
                    res.data.cookbooks[0].owner.should.not.have.property("password");

                    done();
                })
        })
    })
})