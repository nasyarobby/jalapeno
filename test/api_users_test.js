process.env.NODE_ENV = "test"

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const should = chai.should();

const App = require("../app");
const agent = chai.request(App).keepOpen();
const knex = require("../knex");

let validUser = {
    email: "newuser@somedomain.com",
    username: "username01",
    name: "Some Random Name",
    password: "secret"
}

describe("API Routes", function () {

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
    })

    afterEach(function (done) {
        knex.migrate.rollback()
            .then(function () {
                done();
            });
    });

    it('should return list of existing users', function (done) {
        agent
            .get("/api/users")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.data.should.be.an('array');
                res.body.data.length.should.equal(3);
                res.body.data[0].id.should.equal(1);
                res.body.status.should.equal('success');
                done();
            })
    })

    it("should register new user", function (done) {
        agent
            .put("/api/users/register")
            .send(validUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.equal('success');
                res.should.be.json;
                res.body.data.id.should.equal(4);
                res.body.data.password.length.should.equal(60); // bcrypt always return 60 bytes hash
                done();
            })
    })

    it("should register new user tho username starts & ends with space", function (done) {
        let user = Object.assign({}, validUser);
        user.username = " newuser ";
        agent
            .put("/api/users/register")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.equal('success');
                res.should.be.json;
                res.body.data.id.should.equal(4);
                res.body.data.password.length.should.equal(60); // bcrypt always return 60 bytes hash
                done();
            })
    })

    it("should reject if username is missing", function (done) {
        let user = Object.assign({}, validUser);
        delete user.username;
        agent
            .put("/api/users/register")
            .send(user)
            .end((err, res) => {

                res.should.have.status(200);
                res.should.be.json;
                res.body.data.username[0].message.should.equal("username is required.")
                res.body.status.should.equal('fail');
                done();
            })
    })

    it("should reject if email is missing", function (done) {
        let user = Object.assign({}, validUser);
        delete user.email;
        agent
            .put("/api/users/register")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.status.should.equal('fail');
                res.body.data.email[0].message.should.equal("email is required.")
                done();
            })
    })

    it("should reject if name is missing", function (done) {
        let user = Object.assign({}, validUser);
        delete user.name;
        agent
            .put("/api/users/register")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.status.should.equal('fail');
                res.body.data.name[0].message.should.equal("name is required.")
                done();
            })
    })

    it("should reject if email is invalid", function (done) {
        let user = Object.assign({}, validUser);
        user.email = "test@gmail,com" // comma not dot
        agent
            .put("/api/users/register")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.status.should.equal('fail');
                res.body.data.email[0].message.should.equal("email is invalid.")
                done();
            })
    })

    it("should reject if username is invalid (contains spaces)", function (done) {
        let user = Object.assign({}, validUser);
        user.username = "  88 oke";
        agent
            .put("/api/users/register")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.status.should.equal('fail');
                res.body.data.username[0].message.should.equal("username is invalid.")
                done();
            })
    })

    it("should reject if password starts with space", function (done) {
        let user = Object.assign({}, validUser);
        user.password = "  secret  ";
        agent
            .put("/api/users/register")
            .send(user)
            .end((err, res) => {
                console.log(res.data)
                res.should.have.status(200);
                res.should.be.json;
                res.body.status.should.equal('fail');
                res.body.data.password[0].message.should.equal("Password cannot start/end with space.")
                done();
            })
    })
})