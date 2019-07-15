let date = new Date();
date.setDate(date.getDate() + 1)
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('cookbooks').del()
    .then(function () {
        // Inserts seed entries
        return knex('cookbooks').insert([{
            cookbook_name: "Spend with Pennies",
            category: "Salads",
            created_at: new Date.now()
        },
        {
            cookbook_name: "Cooking Classy",
            category: "Drinks",
            created_at: new Date.now()
        }
    ]);
});
}