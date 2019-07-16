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
          }
      ]);
  });
  }