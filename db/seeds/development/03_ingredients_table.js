//let date = new Date();
//date.setDate(date.getDate() + 1)
exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('ingredients').del()
      .then(function () {
          // Inserts seed entries
          return knex('ingredients').insert([{
              id: 1,
              ingredient_name: "Grape Tomatoes"
          },
          {
              id: 2,
              ingredient_name: "Red Onion"
          },
          {
              id: 3,
              ingredient_name: "Fresh Herbs"
          },
          {
              id: 4,
              ingredient_name: "Olive Oil"
          },
          {
              id: 5,
              ingredient_name: "Red Wine Vinegar"
          },
          {
              id: 6,
              ingredient_name: "Salt"
          },
          {
              id: 7,
              ingredient_name: "Pepper"
          },
          {
              id: 8,
              ingredient_name: "Bocconcini"
          },
          {
              id: 9,
              ingredient_name: "Granulated Sugar"
          },
          {
              id: 10,
              ingredient_name: "Water"
          },
          {
              id: 11,
              ingredient_name: "Fresh Lemon Juice"
          },
          {
              id: 12,
              ingredient_name: "Ice"
          }
      ]);
  });
  }