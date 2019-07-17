//let date = new Date();
//date.setDate(date.getDate() + 1)
exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('recipecategory').del()
        .then(function () {
            // Inserts seed entries
            return knex('recipecategory').insert([{
                id: 1,
                category_id: 1,
                recipe_id: 1
            },
            {
                id: 2,
                category_id: 2,
                recipe_id: 2
            }
            ]);
        });
}