const JSend = new(require("../../../libs/jsend"))();

function getCookbooks(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSend.setSuccess({}).send());
}

module.exports = getCookbooks