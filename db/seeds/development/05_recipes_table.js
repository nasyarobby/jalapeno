//let date = new Date();
//date.setDate(date.getDate() + 1)
exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('recipes').del()
        .then(function () {
            // Inserts seed entries
            return knex('recipes').insert([{
                id: 1,
                recipe_name: "Fresh Tomato Salad",
                description: "Fresh garden tomatoes topped with herbs and \
                a simple olive oil and vinegar mixture.",
                directions: "1. Place tomatoes, red onion, and bocconcini \
                (if using) in shallow bowl. \n2. Drizzle with olive oil and \
                red wine vinegar. Toss to combine. \n3. Season with salt, \
                pepper, and fresh herbs to taste.",
                preparationTime: "10 min",
                cookTime: "0 min",
                portions: 4,
                notes: "Great to put in the fridge!"
            },
            {
                id: 2,
                recipe_name: "Lemonade",
                description: "There's nothing more refreshing to quench your \
                thirst on a hot summer day than a tall ice cold glass of this \
                lemonade!It's incredibly easy to make and a million times \
                better than any store-bought mix.",
                directions: "1.In a small saucepan combine sugar and 2 cups \
                water. Bring to a boil, while stirring frequently to dissolve \
                sugar. All to cool to room temperature, about 30 minutes. \n\
                2.In a large pitcher stir together sugar syrup mixture, 7 \
                cups cold water and lemon juice. Add ice and serve cold. \
                Store in refrigerator.",
                preparationTime: "10 min",
                cookTime: "5 min",
                portions: 10,
                notes: "Best during a hot summer day!"
            }
            ]);
        });
}