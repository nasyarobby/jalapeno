//let date = new Date();
//date.setDate(date.getDate() + 1)
exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('cookbookrecipe').del()
        .then(function () {
            // Inserts seed entries
            return knex('cookbookrecipe').insert([{
                id: 1,
                cookbook_id: 1,
                recipe_id: 1
            },
            {
                id: 2,
                cookbook_id: 2,
                recipe_id: 2
            },
            {
                id: 3,
                cookbook_id: 4,
                recipe_id: 3
            },
            {
                id: 4,
                cookbook_id: 2,
                recipe_id: 4
            },
            {
                id: 5,
                cookbook_id: 4,
                recipe_id: 5
            },
            {
                id: 6,
                cookbook_id: 1,
                recipe_id: 6
            },
            {
                id: 7,
                cookbook_id: 1,
                recipe_id: 7
            },
            {
                id: 8,
                cookbook_id: 3,
                recipe_id: 8
            },
            {
                id: 9,
                cookbook_id: 3,
                recipe_id: 9
            },
            {
                id: 10,
                cookbook_id: 3,
                recipe_id: 10
            },
            {
                id: 11,
                cookbook_id: 2,
                recipe_id: 11
            },
            {
                id: 12,
                cookbook_id: 4,
                recipe_id: 12
            },
            {
                id: 13,
                cookbook_id: 4,
                recipe_id: 13
            },
            {
                id: 14,
                cookbook_id: 4,
                recipe_id: 14
            },
            {
                id: 15,
                cookbook_id: 4,
                recipe_id: 15
            },
            {
                id: 16,
                cookbook_id: 4,
                recipe_id: 16
            }
            ]);
        });
}
