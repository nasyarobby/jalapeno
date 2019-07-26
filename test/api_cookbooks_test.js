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
                res.body.data.should.be.an("array");
                res.body.data.length.should.equals(4);
                res.body.data[0].id.should.equals(1);
                res.body.data[0].cookbook_name.should.equals('Watching My Figure');
                res.body.data[0].category.should.equals('Healthy');
                //res.data.cookbooks[0].numOfRecipes.should.equals()
                res.body.data[0].should.have.property("created_at");
                res.body.data[0].should.have.property("updated_at");
                res.body.data[0].owner.id.should.equal(1);
                res.body.data[0].owner.name.should.equal("Alice Peace");
                res.body.data[0].owner.name.should.not.have.property("password");
                done();
            })
    })

    it("should return recent cookbooks.", function (done) {
        agent
            .get("/api/cookbooks/recent/4")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.data
            })
    })
    it("should return cookbooks of a user")
    it("should return list of recipes of a cookbok.")
    it("should return content of a recipe")
})