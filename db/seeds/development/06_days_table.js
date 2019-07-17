//let date = new Date();
//date.setDate(date.getDate() + 1)
exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('days').del()
        .then(function () {
            // Inserts seed entries
            return knex('days').insert([{
                id: 1,
                user_id: 1,
                calendar_day: 10,
                recipe_id: 1
            },
            {
                id: 2,
                user_id: 1,
                calendar_day: 10,
                recipe_id: 2
            },
            {
                id: 3,
                user_id: 1,
                calendar_day: 10,
                recipe_id: 1
            },
            {
                id: 4,
                user_id: 2,
                calendar_day: 11,
                recipe_id: 2
            },
            {
                id: 5,
                user_id: 2,
                calendar_day: 11,
                recipe_id: 2
            },
            {
                id: 6,
                user_id: 2,
                calendar_day: 11,
                recipe_id: 1
            }
            ]);
        });
}