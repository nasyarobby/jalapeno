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
            },
            {
                id: 13,
                recipe_id: 3,
                ingredient_id: 13,
                quantity: 4,
                quantity_text: "4",
                unit: "each"
            },
            {
                id: 14,
                recipe_id: 3,
                ingredient_id: 14,
                quantity: 1,
                quantity_text: "1",
                unit: "pound"
            },
            {
                id: 15,
                recipe_id: 3,
                ingredient_id: 15,
                quantity: 0.34,
                quantity_text: "1/3",
                unit: "cup"
            },
            {
                id: 16,
                recipe_id: 3,
                ingredient_id: 4,
                quantity: 3,
                quantity_text: "3",
                unit: "tablespoon"
            },
            {
                id: 17
                recipe_id: 3,
                ingredient_id: 6,
                quantity: 1,
                quantity_text: "fine",
                unit: "sprinkle"
            },
            {
                id: 18,
                recipe_id: 3,
                ingredient_id: 7,
                quantity: 1,
                quantity_text: "fine",
                unit: "sprinkle"
            },
            {
                id: 19,
                recipe_id: 4,
                ingredient_id: 17,
                quantity: 4,
                quantity_text: "4",
                unit: "cups"
            },
            {
                id: 20,
                recipe_id: 4,
                ingredient_id: 18,
                quantity: 1,
                quantity_text: "1",
                unit: "cup"
            },
            {
                id: 21,
                recipe_id: 4,
                ingredient_id: 5,
                quantity: 0.25,
                quantity_text: "1/4",
                unit: "cup"
            },
            {
                id: 22,
                recipe_id: 4,
                ingredient_id: 9,
                quantity: 0.67,
                quantity_text: "2/3",
                unit: "cup"
            },
            {
                id: 23,
                recipe_id: 4,
                ingredient_id: 19,
                quantity: 3.5,
                quantity_text: "2 1/2",
                unit: "tablespoons"
            },
            {
                id: 24,
                recipe_id: 4,
                ingredient_id: 6,
                quantity: 1.5,
                quantity_text: "1 1/2",
                unit: "teaspoons"
            },
            {
                id: 25,
                recipe_id: 4,
                ingredient_id: 7,
                quantity: 0.5,
                quantity_text: "1/2",
                unit: "teaspoon"
            },
            {
                id: 26,
                recipe_id: 4,
                ingredient_id: 20,
                quantity: 1,
                quantity_text: "1",
                unit: "each"
            },
            {
                id: 27,
                recipe_id: 4,
                ingredient_id: 21,
                quantity: 2,
                quantity_text: "2",
                unit: "stalks"
            },
            {
                id: 28,
                recipe_id: 4,
                ingredient_id: 22,
                quantity: 1,
                quantity_text: "1",
                unit: "each"
            },
            {
                id: 29,
                recipe_id: 5,
                ingredient_id: 23,
                quantity: 1,
                quantity_text: "1",
                unit: "can"
            },
            {
                id: 30,
                recipe_id: 5,
                ingredient_id: 24,
                quantity: 1,
                quantity_text: "1",
                unit: "cup"
            },
            {
                id: 31,
                recipe_id: 5,
                ingredient_id: 22,
                quantity: 2,
                quantity_text: "2",
                unit: "each"
            },
            {
                id: 32,
                recipe_id: 5,
                ingredient_id: 18,
                quantity: 1,
                quantity_text: "1",
                unit: "tablespoon"
            },
            {
                id: 33,
                recipe_id: 5,
                ingredient_id: 20,
                quantity: 0.25,
                quantity_text: "1/4",
                unit: "teaspoon"
            },
            {
                id: 34,
                recipe_id: 5,
                ingredient_id: 6,
                quantity: 1,
                quantity_text: "fine",
                unit: "sprinkle"
            },
            {
                id: 35,
                recipe_id: 6,
                ingredient_id: 4,
                quantity: 1,
                quantity_text: "1",
                unit: "tablespoon"
            },
            {
                id: 36,
                recipe_id: 6,
                ingredient_id: 24,
                quantity: 1,
                quantity_text: "1",
                unit: "each"
            },
            {
                id: 37,
                recipe_id: 6,
                ingredient_id: 25,
                quantity: 1,
                quantity_text: "1",
                unit: "pound"
            },
            {
                id: 38,
                recipe_id: 6,
                ingredient_id: 20,
                quantity: 0.5,
                quantity_text: "1/2",
                unit: "each"
            },
            {
                id: 39,
                recipe_id: 6,
                ingredient_id: 22,
                quantity: 0.5,
                quantity_text: "1/2",
                unit: "each"
            },
            {
                id: 40,
                recipe_id: 6,
                ingredient_id: 26,
                quantity: 1,
                quantity_text: "1",
                unit: "cup"
            },
            {
                id: 41,
                recipe_id: 6,
                ingredient_id: 27,
                quantity: 1,
                quantity_text: "1,
                unit: "cup"
            },
            {
                id: 42,
                recipe_id: 6,
                ingredient_id: 6,
                quantity: 1,
                quantity_text: "fine",
                unit: "sprinkle"
            },
            {
                id: 43,
                recipe_id: 6,
                ingredient_id: 16,
                quantity: 5,
                quantity_text: "5",
                unit: "each"
            },
            {
                id: 44,
                recipe_id: 6,
                ingredient_id: 10,
                quantity: 0.33,
                quantity_text: "1/3",
                unit: "cup"
            },
            {
                id: 45,
                recipe_id: 6,
                ingredient_id: 28,
                quantity: 1,
                quantity_text: "1",
                unit: "tablespoon"
            },
            {
                id: 46,
                recipe_id: 6,
                ingredient_id: 29,
                quantity: 1,
                quantity_text: "1",
                unit: "each"
            },
            {
                id: 47,
                recipe_id: 7,
                ingredient_id: 20,
                quantity: 2,
                quantity_text: "2",
                unit: "tablespoons"
            },
            {
                id: 48,
                recipe_id: 7,
                ingredient_id: 22,
                quantity: 2,
                quantity_text: "2",
                unit: "tablespoons"
            },            
		{
                id: 49,
                recipe_id: 7,
                ingredient_id: 26,
                quantity: 2,
                quantity_text: "2",
                unit: "tablespoons"
            },
		{
                id: 50,
                recipe_id: 7,
                ingredient_id: 6,
                quantity: 1,
                quantity_text: "fine",
                unit: "sprinkle"
            },            
		{
                id: 51,
                recipe_id: 7,
                ingredient_id: 7,
                quantity: 1,
                quantity_text: "fine",
                unit: "sprinkle"
            },
            {
                id: 52,
                recipe_id: 8,
                ingredient_id: 30,
                quantity: 1,
                quantity_text: "1",
                unit: "cup"
            },
            {
                id: 53,
                recipe_id: 8,
                ingredient_id: 31,
                quantity: 0.5,
                quantity_text: "1/2",
                unit: "cup"
            },
            {
                id: 54,
                recipe_id: 8,
                ingredient_id: 16,
                quantity: 1,
                quantity_text: "1",
                unit: "each"
            },
            {
                id: 55,
                recipe_id: 8,
                ingredient_id: 9,
                quantity: 0.67,
                quantity_text: "2/3",
                unit: "cup"
            },
            {
                id: 56,
                recipe_id: 8,
                ingredient_id: 32,
                quantity: 0.5,
                quantity_text: "1/2",
                unit: "teaspoon"
            },
            {
                id: 57,
                recipe_id: 8,
                ingredient_id: 33,
                quantity: 0.5,
                quantity_text: "1/2",
                unit: "tcup"
            },
            {
                id: 58,
                recipe_id: 8,
                ingredient_id: 34,
                quantity: 0.5,
                quantity_text: "1/2",
                unit: "cup"
            },
            {
                id: 59,
                recipe_id: 8,
                ingredient_id: 35,
                quantity: 1,
                quantity_text: "1",
                unit: "teaspoon"
            },
            {
                id: 60,
                recipe_id: 8,
                ingredient_id: 6,
                quantity: 0.5,
                quantity_text: "1/2",
                unit: "teaspoon"
            },
            {
                id: 61,
                recipe_id: 8,
                ingredient_id: 36,
                quantity: 1,
                quantity_text: "1",
                unit: "cup"
            },
            {
                id: 62,
                recipe_id: 9,
                ingredient_id: 37,
                quantity: 0.75,
                quantity_text: "3/4",
                unit: "cup"
            },            
		{
                id: 63,
                recipe_id: 9,
                ingredient_id: 38,
                quantity: 3,
                quantity_text: "3",
                unit: "tablespoons"
            },
            {
                id: 64,
                recipe_id: 9,
                ingredient_id: 39,
                quantity: 1,
                quantity_text: "1",
                unit: "tablespoon"
            },
            {
                id: 65,
                recipe_id: 10,
                ingredient_id: 40,
                quantity: 18.25,
                quantity_text: "18.25",
                unit: "ounce"
            },
            {
                id: 66,
                recipe_id: 10,
                ingredient_id: 41,
                quantity: 5.9,
                quantity_text: "5.9",
                unit: "ounce"
            },
            {
                id: 67,
                recipe_id: 10,
                ingredient_id: 42,
                quantity: 1,
                quantity_text: "1",
                unit: "cup"
            },
            {
                id: 68,
                recipe_id: 10,
                ingredient_id: 4,
                quantity: 1,
                quantity_text: "1",
                unit: "cup"
            },
            {
                id: 69,
                recipe_id: 10,
                ingredient_id: 16,
                quantity: 4,
                quantity_text: "4",
                unit: "each"
            },
            {
                id: 70,
                recipe_id: 10,
                ingredient_id: 10,
                quantity: 0.5,
                quantity_text: "1/2",
                unit: "cup"
            },
            {
                id: 71,
                recipe_id: 10,
                ingredient_id: 37,
                quantity: 2,
                quantity_text: "2",
                unit: "cups"
            },
            {
                id: 72,
                recipe_id: 11,
                ingredient_id: 13,
                quantity: 6,
                quantity_text: "6",
                unit: "each"
            },
            {
                id: 73,
                recipe_id: 11,
                ingredient_id: 43,
                quantity: 0.5,
                quantity_text: "1/2",
                unit: "cup"
            },
            {
                id: 74,
                recipe_id: 11,
                ingredient_id: 44,
                quantity: 3,
                quantity_text: "3",
                unit: "cloves"
            },
            {
                id: 75,
                recipe_id: 11,
                ingredient_id: 4,
                quantity: 0.25,
                quantity_text: "1/4",
                unit: "cup"
            },
            {
                id: 76,
                recipe_id: 11,
                ingredient_id: 45,
                quantity: 2,
                quantity_text: "2",
                unit: "tablespoons"
            },
            {
                id: 77,
                recipe_id: 11,
                ingredient_id: 15,
                quantity: 0.25,
                quantity_text: "1/4",
                unit: "cup"
            },
            {
                id: 78,
                recipe_id: 11,
                ingredient_id: 6,
                quantity: 0.25,
                quantity_text: "1/4",
                unit: "teaspoon"
            },
            {
                id: 79,
                recipe_id: 11,
                ingredient_id: 7,
                quantity: 0.25,
                quantity_text: "0.25",
                unit: "teaspoon"
            },
            {
                id: 80,
                recipe_id: 11,
                ingredient_id: 46,
                quantity: 1,
                quantity_text: "1",
                unit: "each"
            },
            {
                id: 81,
                recipe_id: 11,
                ingredient_id: 14,
                quantity: 2,
                quantity_text: "2",
                unit: "cups"
            },
            {
                id: 82,
                recipe_id: 12,
                ingredient_id: 47,
                quantity: 1,
                quantity_text: "1",
                unit: "pound"
            },
            {
                id: 83,
                recipe_id: 12,
                ingredient_id: 49,
                quantity: 0.5,
                quantity_text: "1/2",
                unit: "pound"
            },
            {
                id: 84,
                recipe_id: 12,
                ingredient_id: 44,
                quantity: 2,
                quantity_text: "2",
                unit: "cloves"
            },
            {
                id: 85,
                recipe_id: 12,
                ingredient_id: 16,
                quantity: 2,
                quantity_text: "2",
                unit: "each"
            },
            {
                id: 86,
                recipe_id: 12,
                ingredient_id: 50,
                quantity: 1,
                quantity_text: "1",
                unit: "cup"
            },
            {
                id: 87,
                recipe_id: 12,
                ingredient_id: 51,
                quantity: 1.5,
                quantity_text: "1 1/2",
                unit: "tablespoons"
            },
            {
                id: 88,
                recipe_id: 12,
                ingredient_id: 6,
                quantity: 1,
                quantity_text: "fine",
                unit: "sprinkle"
            },
            {
                id: 89,
                recipe_id: 12,
                ingredient_id: 7,
                quantity: 1,
                quantity_text: "fine",
                unit: "sprinkle"
            },
            {
                id: 90,
                recipe_id: 12,
                ingredient_id: 52,
                quantity: 2,
                quantity_text: "2",
                unit: "cups"
            },
            {
                id: 91,
                recipe_id: 12,
                ingredient_id: 10,
                quantity: 1.5,
                quantity_text: "1 1/2",
                unit: "cups"
            },
            {
                id: 92,
                recipe_id: 12,
                ingredient_id: 4,
                quantity: 1,
                quantity_text: "1",
                unit: "cup"
            },
            {
                id: 93,
                recipe_id: 13,
                ingredient_id: 47,
                quantity: 1,
                quantity_text: "1",
                unit: "pound"
            },
            {
                id: 94,
                recipe_id: 13,
                ingredient_id: 52,
                quantity: 0.75,
                quantity_text: "3/4",
                unit: "cup"
            },
            {
                id: 95,
                recipe_id: 13,
                ingredient_id: 53,
                quantity: 2,
                quantity_text: "2",
                unit: "teaspoons"
            },
            {
                id: 96,
                recipe_id: 13,
                ingredient_id: 44,
                quantity: 2,
                quantity_text: "2",
                unit: "cloves"
            },
            {
                id: 97,
                recipe_id: 13,
                ingredient_id: 51,
                quantity: 2,
                quantity_text: "2",
                unit: "tablespoons"
            },
            {
                id: 98,
                recipe_id: 13,
                ingredient_id: 54,
                quantity: 2,
                quantity_text: "2",
                unit: "tablespoons"
            },
            {
                id: 99,
                recipe_id: 13,
                ingredient_id: 16,
                quantity: 1,
                quantity_text: "1",
                unit: "each"
            },
            {
                id: 100,
                recipe_id: 13,
                ingredient_id: 46,
                quantity: 1,
                quantity_text: "1",
                unit: "each"
            },
            {
                id: 101,
                recipe_id: 13,
                ingredient_id: 4,
                quantity: 1,
                quantity_text: "1",
                unit: "tablespoon"
            },
            {
                id: 102,
                recipe_id: 13,
                ingredient_id: 55,
                quantity: 0.5,
                quantity_text: "1/2",
                unit: "teaspoon"
            },
            {
                id: 103,
                recipe_id: 13,
                ingredient_id: 6,
                quantity: 1,
                quantity_text: "fine",
                unit: "sprinkle"
            },
            {
                id: 104,
                recipe_id: 13,
                ingredient_id: 56,
                quantity: 14,
                quantity_text: "14",
                unit: "ounce"
            },
            {
                id: 105,
                recipe_id: 13,
                ingredient_id: 57,
                quantity: 4,
                quantity_text: "4",
                unit: "slices"
            },
            {
                id: 105,
                recipe_id: 14,
                ingredient_id: 47,
                quantity: 1,
                quantity_text: "1",
                unit: "pound"
            },
            {
                id: 106,
                recipe_id: 14,
                ingredient_id: 20,
                quantity: 1,
                quantity_text: "1",
                unit: "cup"
            },
            {
                id: 107,
                recipe_id: 14,
                ingredient_id: 21,
                quantity: 1,
                quantity_text: "1",
                unit: "cup"
            },
            {
                id: 108,
                recipe_id: 14,
                ingredient_id: 58,
                quantity: 1,
                quantity_text: "1",
                unit: "cup"
            },
            {
                id: 109,
                recipe_id: 14,
                ingredient_id: 44,
                quantity: 2,
                quantity_text: "2",
                unit: "cloves"
            },
            {
                id: 110,
                recipe_id: 14,
                ingredient_id: 13,
                quantity: 14.5,
                quantity_text: "14.5",
                unit: "ounce"
            },
            {
                id: 111,
                recipe_id: 14,
                ingredient_id: 56,
                quantity: 15,
                quantity_text: "15",
                unit: "ounce"
            },
            {
                id: 112,
                recipe_id: 14,
                ingredient_id: 59,
                quantity: 19,
                quantity_text: "19",
                unit: "ounce"
            },
            {
                id: 113,
                recipe_id: 14,
                ingredient_id: 10,
                quantity: 2,
                quantity_text: "2",
                unit: "cups"
            },
            {
                id: 114,
                recipe_id: 14,
                ingredient_id: 60,
                quantity: 5,
                quantity_text: "5",
                unit: "teaspoons"
            },
            {
                id: 115,
                recipe_id: 14,
                ingredient_id: 51,
                quantity: 1,
                quantity_text: "1",
                unit: "tablespoon"
            },
            {
                id: 116,
                recipe_id: 14,
                ingredient_id: 61,
                quantity: 0.5,
                quantity_text: "1/2",
                unit: "teaspoon"
            },
            {
                id: 117,
                recipe_id: 14,
                ingredient_id: 15,
                quantity: 0.5,
                quantity_text: "1/2",
                unit: "teaspoon"
            },
            {
                id: 118,
                recipe_id: 14,
                ingredient_id: 62,
                quantity: 2,
                quantity_text: "2",
                unit: "cups"
            },
            {
                id: 119,
                recipe_id: 14,
                ingredient_id: 63,
                quantity: 15.25,
                quantity_text: "15.25",
                unit: "ounce"
            },
            {
                id: 120,
                recipe_id: 14,
                ingredient_id: 64,
                quantity: 15,
                quantity_text: "15",
                unit: "ounce"
            },
            {
                id: 121,
                recipe_id: 14,
                ingredient_id: 17,
                quantity: 1,
                quantity_text: "1",
                unit: "cup"
            },
            {
                id: 122,
                recipe_id: 15,
                ingredient_id: 15,
                quantity: 2,
                quantity_text: "2",
                unit: "teaspoons"
            },
            {
                id: 123,
                recipe_id: 15,
                ingredient_id: 65,
                quantity: 4,
                quantity_text: "4",
                unit: "each"
            },
            {
                id: 124,
                recipe_id: 15,
                ingredient_id: 20,
                quantity: 1,
                quantity_text: "1",
                unit: "each"
            },
            {
                id: 125,
                recipe_id: 15,
                ingredient_id: 44,
                quantity: 3,
                quantity_text: "3",
                unit: "gloves"
            },
            {
                id: 126,
                recipe_id: 15,
                ingredient_id: 66,
                quantity: 0.5,
                quantity_text: "1/2",
                unit: "cup"
            },
            {
                id: 127,
                recipe_id: 15,
                ingredient_id: 67,
                quantity: 1,
                quantity_text: "1",
                unit: "cup"
            },
            {
                id: 128,
                recipe_id: 15,
                ingredient_id: 68,
                quantity: 1,
                quantity_text: "1",
                unit: "each"
            },
            {
                id: 129,
                recipe_id: 15,
                ingredient_id: 51,
                quantity: 0.5,
                quantity_text: "1/2",
                unit: "cup"
            },
            {
                id: 130,
                recipe_id: 15,
                ingredient_id: 69,
                quantity: 3,
                quantity_text: "3",
                unit: "cups"
            },
            {
                id: 131,
                recipe_id: 15,
                ingredient_id: 70,
                quantity: 15,
                quantity_text: "15",
                unit: "ounce"
            },
            {
                id: 132,
                recipe_id: 15,
                ingredient_id: 71,
                quantity: 16,
                quantity_text: "16",
                unit: "ounce"
            },
            {
                id: 133,
                recipe_id: 15,
                ingredient_id: 72,
                quantity: 1,
                quantity_text: "1",
                unit: "cup"
            },
            {
                id: 134,
                recipe_id: 16,
                ingredient_id: 33,
                quantity: 3,
                quantity_text: "3",
                unit: "cups"
            },
            {
                id: 135,
                recipe_id: 16,
                ingredient_id: 9,
                quantity: 1,
                quantity_text: "1",
                unit: "tablespoon"
            },
            {
                id: 136,
                recipe_id: 16,
                ingredient_id: 6,
                quantity: 1.5,
                quantity_text: "1 1/2",
                unit: "teaspoons"
            },
            {
                id: 137,
                recipe_id: 16,
                ingredient_id: 10,
                quantity: 1.125,
                quantity_text: "1 1/8",
                unit: "cup"
            },
            {
                id: 138,
                recipe_id: 16,
                ingredient_id: 4,
                quantity: 1.5,
                quantity_text: "1 1/2",
                unit: "tablespoons"
            },
            {
                id: 139,
                recipe_id: 16,
                ingredient_id: 73,
                quantity: 1.5,
                quantity_text: "1 1/2",
                unit: "teaspoons"
            },
            {
                id: 140,
                recipe_id: 16,
                ingredient_id: 16,
                quantity: 1,
                quantity_text: "1",
                unit: "each"
            },
            {
                id: 141,
                recipe_id: 16,
                ingredient_id: 74,
                quantity: 1,
                quantity_text: "1",
                unit: "tablespoon
            },
            {
                id: 142,
                recipe_id: 16,
                ingredient_id: 75,
                quantity: 1,
                quantity_text: "1",
                unit: "tablespoon"
            }
            ]);
        });
}
