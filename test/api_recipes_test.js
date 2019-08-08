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

describe("Recipe API Routes", function () {

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
                cookbookId: [{
                    id: 1
                }],
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

                    res.body.data.ingredients[1].id.should.satisfy(id => id == 76 || id == 6)

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
        it("updates the recipe.", function (done) {
            let data = {
                name: "Cake ABC",
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
                cookbookId: [{
                    id: 1
                }],
                categories: [2]
            }

            agent
                .put("/api/recipes/1")
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
                    res.body.data.id.should.equal(1);
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

                    res.body.data.ingredients[1].id.should.satisfy(id => id == 76 || id == 6)

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

    context("DELETE /api/recipes/:rid", function () {
        it("delete the recipe", function (done) {
            agent
                .delete("/api/recipes/1")
                .set({
                    "Authorization": "Bearer " + token
                })
                .end((err, res) => {
                    if (err) done(err);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.status.should.equal("success");

                    done();
                })
        })
    })

})