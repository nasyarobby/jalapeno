//let date = new Date();
//date.setDate(date.getDate() + 1)
exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('recipeingredient').del()
        .then(function () {
            // Inserts seed entries
            return knex('recipeingredient').insert([{
                id: 1,
                recipe_id: 1,
                ingredient_id: 1,
                quantity: 2,
                quantity_text: "2",
                unit: "pints"
            },
            {
                id: 2,
                recipe_id: 1,
                ingredient_id: 2,
                quantity: 0.25,
                quantity_text: "1/4",
                unit: "cups"
            },
            {
                id: 3,
                recipe_id: 1,
                ingredient_id: 3,
                quantity: 1,
                quantity_text: "1",
                unit: "tablespoons"
            },
            {
                id: 4,
                recipe_id: 1,
                ingredient_id: 4,
                quantity: 3,
                quantity_text: "3",
                unit: "tablespoons"
            },
            {
                id: 5,
                recipe_id: 1,
                ingredient_id: 5,
                quantity: 1,
                quantity_text: "1",
                unit: "tablespoons"
            },
            {
                id: 6,
                recipe_id: 1,
                ingredient_id: 6,
                quantity: 1,
                quantity_text: "",
                unit: "to taste"
            },
            {
                id: 7,
                recipe_id: 1,
                ingredient_id: 7,
                quantity: 1,
                quantity_text: "",
                unit: "to taste"
            },
            {
                id: 8,
                recipe_id: 1,
                ingredient_id: 8,
                quantity: 0.5,
                quantity_text: "1/2",
                unit: "cup"
            },
            {
                id: 9,
                recipe_id: 2,
                ingredient_id: 9,
                quantity: 2,
                quantity_text: "2",
                unit: "cups"
            },
            {
                id: 10,
                recipe_id: 2,
                ingredient_id: 10,
                quantity: 9,
                quantity_text: "9",
                unit: "cups"
            },
            {
                id: 11,
                recipe_id: 2,
                ingredient_id: 11,
                quantity: 2,
                quantity_text: "2",
                unit: "cups"
            },
            {
                id: 12,
                recipe_id: 2,
                ingredient_id: 12,
                quantity: 3,
                quantity_text: "3",
                unit: "each"
            }
            ]);
        });
}