process.env.NODE_ENV = "test"

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

const App = require("../app");
const agent = chai.request(App).keepOpen();
const knex = require("../knex");

let validUser = {
    email: "newuser@somedomain.com",
    username: "username01",
    name: "Some Random Name",
    password: "secret"
}

let validCredential = {
    login: "alice001",
    password: "secret"
}

let validCredentialUnverifiedUser = {
    login: "bobby002",
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

    it("should return specific users")

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
                res.should.have.status(200);
                res.should.be.json;
                res.body.status.should.equal('fail');
                res.body.data.password[0].message.should.equal("Password cannot start/end with space.")
                done();
            })
    })

    it("should authenticate user with correct username and password (Verified)", function (done) {
        let user = Object.assign({}, validCredential);
        agent
            .post("/api/users/login")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.status.should.equal('success');
                res.body.data.should.have.property("token");
                done();
            })
    })

    it("should reject user with correct username and password (Unverified)", function (done) {
        let user = Object.assign({}, validCredentialUnverifiedUser);
        agent
            .post("/api/users/login")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.status.should.equal('fail');
                res.body.data.should.not.have.property("token");
                res.body.data.authentication[0].message.should.equal("Authentication failed. User has not been verified.")
                done();
            })
    })

    it("should reject if missing login", function (done) {
        let user = Object.assign({}, validCredential);
        delete user.login;
        agent
            .post("/api/users/login")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.status.should.equal('fail');
                res.body.data.should.not.have.property("token");
                res.body.data.login[0].message.should.equal("Login is required.")
                done();
            })
    })

    it("should reject if missing password", function (done) {
        let user = Object.assign({}, validCredential);
        delete user.password;
        agent
            .post("/api/users/login")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.status.should.equal('fail');
                res.body.data.should.not.have.property("token");
                res.body.data.password[0].message.should.equal("Password is required.")
                done();
            })
    })

    it("should reject if login is empty / contain only spaces", function (done) {
        let user = Object.assign({}, validCredential);
        user.login = "    ";
        agent
            .post("/api/users/login")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.status.should.equal('fail');
                res.body.data.should.not.have.property("token");
                res.body.data.login[0].message.should.equal("Login cannot be empty.")
                done();
            })
    })

    it("should reject if password is empty / contain only spaces", function (done) {
        let user = Object.assign({}, validCredential);
        user.password = "  ";
        agent
            .post("/api/users/login")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.status.should.equal('fail');
                res.body.data.should.not.have.property("token");
                res.body.data.password[0].message.should.equal("Password cannot be empty.")
                done();
            })
    })

    it("should reject if login/password does not match", function (done) {
        let user = Object.assign({}, validCredential);
        user.password += "a"
        agent
            .post("/api/users/login")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.status.should.equal('fail');
                res.body.data.should.not.have.property("token");
                res.body.data.authentication[0].message.should.equal("Authentication failed.")
                done();
            })
    })
    it("should verify the user using a link")
})