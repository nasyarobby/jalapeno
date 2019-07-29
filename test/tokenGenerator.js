const jwt = require("jsonwebtoken");
const key = process.env.KEY;
if (key === undefined)
    throw new Error("Key is undefined(TokenGenerator.js)");

class TokenGenerator {
    static get(payload = {
        uid: 1,
        username: "alice001",
        name: "Alice Peace"
    }) {
        return jwt.sign(payload, key);
    }
}

module.exports = TokenGenerator;