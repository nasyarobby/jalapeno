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
            },
            {
                id: 13,
                ingredient_name: "Tomatos",
                location: "Trader Joes",
                price: 2.99
            },
            {
                id: 14,
                ingredient_name: "Mozzarella Cheese",
                location: "Trader Joes",
                price: 7.99
            },
            {
                id: 15,
                ingredient_name: "Basil leaves",
                location: "Trader Joes",
                price: 6.89
            },
            {
                id: 16,
                ingredient_name: "Egg",
                location: "Trader Joes",
                price: 0.89
            },
            {
                id: 17,
                ingredient_name: "Elbow Macaroni",
                location: "Trader Joes",
                price: 12.79
            },
            {
                id: 18,
                ingredient_name: "Mayonnaise",
                location: "Target",
                price: 5.89
            },
            {
                id: 19,
                ingredient_name: "Yellow mustard",
                location: "Target",
                price: 4.89
            },
            {
                id: 20,
                ingredient_name: "Onion",
                location: "Target",
                price: 2.24
            },
            {
                id: 21,
                ingredient_name: "Celery",
                location: "Target",
                price: 3.09
            },
            {
                id: 22,
                ingredient_name: "Bell Pepper",
                location: "Target",
                price: 1.23
            },
            {
                id: 23,
                ingredient_name: "Tuna",
                location: "Target",
                price: 10.53
            },
            {
                id: 24,
                ingredient_name: "Sweet Potato",
                location: "Target",
                price: 2.23
            },
            {
                id: 25,
                ingredient_name: "Sausage",
                location: "Target",
                price: 6.23
            },
            {
                id: 26,
                ingredient_name: "Mushrooms",
                location: "Target",
                price: 4.23
            },
            {
                id: 27,
                ingredient_name: "Kale leaves",
                location: "Target",
                price: 6.23
            },
            {
                id: 28,
                ingredient_name: "Dry thyme",
                location: "Target",
                price: 3.77
            },
            {
                id: 29,
                ingredient_name: "Green Onion",
                location: "Wholefoods",
                price: 4.23
            },
            {
                id: 30,
                ingredient_name: "Nonfat milk",
                location: "Wholefoods",
                price: 8.23
            },
            {
                id: 31,
                ingredient_name: "Unsweetened applesauce",
                location: "Wholefoods",
                price: 9.53
            },
            {
                id: 32,
                ingredient_name: "Vanilla extract",
                location: "Wholefoods",
                price: 7.33
            },
            {
                id: 33,
                ingredient_name: "All-purpose flour",
                location: "Wholefoods",
                price: 7.29
            },
            {
                id: 34,
                ingredient_name: "Whole wheat flour",
                location: "Wholefoods",
                price: 9.03
            },
            {
                id: 35,
                ingredient_name: "Baking soda",
                location: "Wholefoods",
                price: 2.23
            },
            {
                id: 36,
                ingredient_name: "Blueberries",
                location: "Wholefoods",
                price: 5.66
            },
            {
                id: 37,
                ingredient_name: "Semisweet chocolate chips",
                location: "Wholefoods",
                price: 10.93
            },
            {
                id: 38,
                ingredient_name: "Butter",
                location: "Wholefoods",
                price: 8.29
            },
            {
                id: 39,
                ingredient_name: "Light corn syrup",
                location: "Wholefoods",
                price: 6.44
            },
            {
                id: 40,
                ingredient_name: "Devil's food cake mix",
                location: "Wholefoods",
                price: 12.44
            },
            {
                id: 41,
                ingredient_name: "Instant chocolate pudding mix",
                location: "Wholefoods",
                price: 12.44
            },
            {
                id: 42,
                ingredient_name: "Sour cream",
                location: "Wholefoods",
                price: 6.18
            },
            {
                id: 43,
                ingredient_name: "Sun-dried tomatos",
                location: "Star market",
                price: 8.99
            },
            {
                id: 44,
                ingredient_name: "Minced garlic",
                location: "Star market",
                price: 4.59
            },
            {
                id: 45,
                ingredient_name: "Balsamic vinegar",
                location: "Star market",
                price:9.21
            },
            {
                id: 46,
                ingredient_name: "French baguette",
                location: "Star market",
                price: 4.33
            },
            {
                id: 47,
                ingredient_name: "Gound beef",
                location: "Star market",
                price: 6.79
            },
            {
                id: 48,
                ingredient_name: "Ground veal",
                location: "Star market",
                price: 9.49
            },
            {
                id: 49,
                ingredient_name: "Ground pork",
                location: "Star market",
                price: 3.89
            },
            {
                id: 50,
                ingredient_name: "Romano cheese",
                location: "Star market",
                price: 3.22
            },
            {
                id: 51,
                ingredient_name: "Italian flat leaf parsley",
                location: "Star market",
                price: 2.98
            },
            {
                id: 52,
                ingredient_name: "Bread crumbs",
                location: "Star market",
                price: 3.09
            },
            {
                id: 53,
                ingredient_name: "Dried Italian seasoning",
                location: "Star market",
                price: 5.55
            },
            {
                id: 54,
                ingredient_name: "Parmesan cheese",
                location: "Star market",
                price: 6.78
            },
            {
                id: 55,
                ingredient_name: "Garlic powder",
                location: "Star market",
                price: 3.09
            },
            {
                id: 56,
                ingredient_name: "Spaghetti sauce",
                location: "Star market",
                price: 19.14
            },
            {
                id: 57,
                ingredient_name: "Provolone cheese",
                location: "Star market",
                price: 8.65
            },
            {
                id: 58,
                ingredient_name: "Carrots",
                location: "Star market",
                price: 2.55
            },
            {
                id: 59,
                ingredient_name: "Kidney beans",
                location: "Star market",
                price: 1.23
            },
            {
                id: 60,
                ingredient_name: "Beef bouillon granules",
                location: "Star market",
                price: 8.99
            },
            {
                id: 61,
                ingredient_name: "Dried oregano",
                location: "Star market",
                price: 4.55
            },
            {
                id: 62,
                ingredient_name: "Cabbage",
                location: "Star market",
                price: 3.23
            },
            {
                id: 63,
                ingredient_name: "Whole kernel corn",
                location: "Star market",
                price: 2.34
            },
            {
                id: 64,
                ingredient_name: "Green beans",
                location: "Star market",
                price: 2.34
            },
            {
                id: 65,
                ingredient_name: "Italian turkey sausage links",
                location: "Star market",
                price: 6.66
            },
            {
                id: 66,
                ingredient_name: "Pearl barley",
                location: "Star market",
                price: 4.15
            },
            {
                id: 67,
                ingredient_name: "Green lentils",
                location: "Star market",
                price: 2.34
            },
            {
                id: 68,
                ingredient_name: "Bone-in chicken breast",
                location: "Star market",
                price: 4.19
            },
            {
                id: 69,
                ingredient_name: "Chicken stock",
                location: "Star market",
                price: 8.99
            },
            {
                id: 70,
                ingredient_name: "Chickpeas",
                location: "Star market",
                price: 5.12
            },
            {
                id: 71,
                ingredient_name: "Spinach leaves",
                location: "Star market",
                price:3.89
            },
            {
                id: 72,
                ingredient_name: "Mild salsa",
                location: "Star market",
                price: 10.29
            },
            {
                id: 73,
                ingredient_name: "Dry yeast",
                location: "Star market",
                price: 7.89
            },
            {
                id: 74,
                ingredient_name: "Sesame seeds",
                location: "Star market",
                price: 4.56
            },
            {
                id: 75,
                ingredient_name: "Cornmeal",
                location: "Star market",
                price: 8.99
            }
            ]);
        });
}
