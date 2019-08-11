const Category = require('../../../models/category_model')
const JSend = new(require("../../../libs/jsend"))();

function getCategories(req, res) {
    Category.query()
        .orderBy([{ column: 'category', order: 'asc' }])
        .then(categories => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSend.setSuccess({categories}).send());
        })
}

module.exports = getCategories;