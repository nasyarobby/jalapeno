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

describe("Category API Routes", function () {

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

    // Testing goes here
    context("GET /api/categories/", function () {
        it("should return all categories", function (done) {
            agent
                .get("/api/categories/")
                .end((err, res) => {
                    if (err)
                        done(err);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.data.categories.should.be.an("array");
                    res.body.data.categories.length.should.equals(9);
                    res.body.data.categories[0].id.should.equals(9);
                    res.body.data.categories[0].category.should.equals('Appetizer');
                    done();
                })
        })
    })

    context("GET /api/categories/cookbooks/:name", function () {
        it("name=International should return cookbooks with category=International", function (done) {
            agent
                .get("/api/categories/cookbooks/International")
                .end((err, res) => {
                    if (err)
                        done(err);

                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.data.cookbooks.should.be.an("array");
                    res.body.data.cookbooks.length.should.equal(1);
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
                    done();
                })
        })
    })

    context("GET /api/categories/recipes/:id", function () {
        it("id=1 should 4 recipes, all for category 'Salad'", function (done) {
            agent
                .get("/api/categories/recipes/1")
                .end((err, res) => {
                    if (err)
                        done(err);

                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.data.recipes.should.be.an("array");
                    res.body.data.recipes.length.should.equal(4);
                    res.body.data.recipes[0].should.have.property("id");
                    res.body.data.recipes[0].id.should.equal(5);
                    res.body.data.recipes[0].should.have.property("name");
                    res.body.data.recipes[0].name.should.equals("Spicy Mexican Tuna Salad");
                    res.body.data.recipes[0].should.have.property("description");
                    res.body.data.recipes[0].should.have.property("directions");
                    res.body.data.recipes[0].should.have.property("preparationTime");
                    res.body.data.recipes[0].preparationTime.should.equal("10 min");
                    res.body.data.recipes[0].should.have.property("cookTime");
                    res.body.data.recipes[0].cookTime.should.equal("10 min");
                    res.body.data.recipes[0].should.have.property("portions");
                    res.body.data.recipes[0].portions.should.equal(8);
                    res.body.data.recipes[0].should.have.property("notes");
                    //res.body.data.recipes[0].notes.should.equal("Per Serving: 47 calories; 1.6 g fat; 3 g carbohydrates; 5 g protein; 5 mg cholesterol; 96 mg sodium.");
                    res.body.data.recipes[0].categories.should.be.an('array');
                    res.body.data.recipes[0].categories.length.should.equal(1);
                    res.body.data.recipes[0].categories[0].name.should.equal("Salad");

                    res.body.data.recipes[0].ingredients.should.be.an('array');
                    res.body.data.recipes[0].ingredients.length.should.equal(6);
                    res.body.data.recipes[0].ingredients[0].should.have.property("quantity");
                    res.body.data.recipes[0].ingredients[0].should.have.property("quantity_text");
                    res.body.data.recipes[0].ingredients[0].should.have.property("unit");
                    // name is ingredient_name in the database
                    res.body.data.recipes[0].ingredients[0].should.have.property("name");
                    res.body.data.recipes[0].ingredients[0].name.should.equal("Tuna");

                    res.body.data.recipes[0].should.have.property("createdAt");
                    res.body.data.recipes[0].should.have.property("updatedAt");

                    done();
                })
        })
    })

})