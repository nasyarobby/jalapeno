//let date = new Date();
//date.setDate(date.getDate() + 1)
exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('ingredients').del()
        .then(function () {
            // Inserts seed entries
            return knex('ingredients').insert([{
                id: 1,
                ingredient_name: "Grape Tomatoes",
                location: "Stop N Shop",
                price: 1.99
            },
            {
                id: 2,
                ingredient_name: "Red Onion",
                location: "Market Basket",
                price: 1.99
            },
            {
                id: 3,
                ingredient_name: "Fresh Herbs",
                location: "Stop N Shop",
                price: 1.99
            },
            {
                id: 4,
                ingredient_name: "Olive Oil",
                location: "Market Basket",
                price: 7.99
            },
            {
                id: 5,
                ingredient_name: "Red Wine Vinegar",
                location: "Stop N Shop",
                price: 6.99
            },
            {
                id: 6,
                ingredient_name: "Salt",
                location: "Stop N Shop",
                price: 4.99
            },
            {
                id: 7,
                ingredient_name: "Pepper",
                location: "Stop N Shop",
                price: 4.99
            },
            {
                id: 8,
                ingredient_name: "Bocconcini",
                location: "Trader Joes",
                price: 2.99
            },
            {
                id: 9,
                ingredient_name: "Granulated Sugar",
                location: "Stop N Shop",
                price: 3.99
            },
            {
                id: 10,
                ingredient_name: "Water",
                location: "Home",
                price: 0
            },
            {
                id: 11,
                ingredient_name: "Fresh Lemon Juice",
                location: "Trader Joes",
                price: 2.99
            },
            {
                id: 12,
                ingredient_name: "Ice",
                location: "Home",
                price: 0
            }
            ]);
        });
}