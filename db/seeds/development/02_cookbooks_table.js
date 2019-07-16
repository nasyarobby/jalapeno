//let date = new Date();
//date.setDate(date.getDate() + 1)
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('cookbooks').del()
    .then(function () {
        // Inserts seed entries
        return knex('cookbooks').insert([{
            id: 1,
            user_id: 1,
            cookbook_name: "Spend with Pennies",
            category: "Salads"
        },
        {
            id: 2,
            user_id: 2,
            cookbook_name: "Cooking Classy",
            category: "Drinks"
        }
    ]);
});
}