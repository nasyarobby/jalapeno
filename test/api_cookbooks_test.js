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
    it("GET /api/cookbooks/ should return all cookbooks", function (done) {
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

        it("num=a should return error")
        it("num= (empty) should return 4 recent cookbooks")
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
                    res.data.owner.name.should.not.have.property("password");
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
                    res.data.owner.name.should.not.have.property("password");

                    done();
                })
        })
    })

    it("GET /recipe/:rid should return content of a recipe")
})