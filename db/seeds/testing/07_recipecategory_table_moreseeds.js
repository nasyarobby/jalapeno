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
            },
            {
                id: 3,
                category_id: 1,
                recipe_id: 3
            },
            {
                id: 4,
                category_id: 1,
                recipe_id: 4
            },
            {
                id: 5,
                category_id: 1,
                recipe_id: 5
            },
            {
                id: 6,
                category_id: 3,
                recipe_id: 6
            },
            {
                id: 7,
                category_id: 3,
                recipe_id: 7
            },
            {
                id: 8,
                category_id: 4,
                recipe_id: 8
            },
            {
                id: 9,
                category_id: 4,
                recipe_id: 9
            },
            {
                id: 10,
                category_id: 4,
                recipe_id: 10
            },
            {
                id: 11,
                category_id: 9,
                recipe_id: 11
            },
            {
                id: 12,
                category_id: 5,
                recipe_id: 12
            },
            {
                id: 13,
                category_id: 6,
                recipe_id: 13
            },
            {
                id: 14,
                category_id: 7,
                recipe_id: 14
            },
            {
                id: 15,
                category_id: 7,
                recipe_id: 15
            },
            {
                id: 16,
                category_id: 8,
                recipe_id: 16
            }
            ]);
        });
}
