
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
            cookbook_name: "Watching My Figure",
            category: "Healthy"
        },
        {
            id: 2,
            user_id: 2,
            cookbook_name: "Summer Specialties",
            category: "Summer"
        },
        {
            id: 3,
            user_id: 3,
            cookbook_name: "Reverse Dinner: Dessert First",
            category: "Desserts"
        },
        {
            id: 4,
            user_id: 1,
            cookbook_name: "A Taste of the World",
            category: "International"
        }
    ]);
});
}
