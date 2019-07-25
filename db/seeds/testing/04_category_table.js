//let date = new Date();
//date.setDate(date.getDate() + 1)
exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('category').del()
        .then(function () {
            // Inserts seed entries
            return knex('category').insert([{
                    id: 1,
                    category: "Salad"
                },
                {
                    id: 2,
                    category: "Drink"
                },
                {
                    id: 3,
                    category: "Breakfast"
                },
                {
                    id: 4,
                    category: "Desserts"
                },
                {
                    id: 5,
                    category: "Italian"
                },
                {
                    id: 6,
                    category: "Sandwich"
                },
                {
                    id: 7,
                    category: "Soup"
                },
                {
                    id: 8,
                    category: "Bread"
                },
                {
                    id: 9,
                    category: "Appetizer"
                }
            ]);
        })
}