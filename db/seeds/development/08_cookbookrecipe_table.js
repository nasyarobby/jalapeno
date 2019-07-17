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
            }
            ]);
        });
}