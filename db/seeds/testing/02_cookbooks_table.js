let date = new Date();
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
            category: "Healthy",
            created_at: "2019-07-27 00:00:00",
            updated_at: "2019-07-27 00:00:01"
        },
        {
            id: 2,
            user_id: 2,
            cookbook_name: "Summer Specialties",
            category: "Summer",
            created_at: "2019-07-27 00:00:02",
            updated_at: "2019-07-27 00:00:03"
        },
        {
            id: 3,
            user_id: 3,
            cookbook_name: "Reverse Dinner: Dessert First",
            category: "Desserts",
            created_at: "2019-07-27 00:00:04",
            updated_at: "2019-07-27 00:00:05"
        },
        {
            id: 4,
            user_id: 1,
            cookbook_name: "A Taste of the World",
            category: "International",
            created_at: "2019-07-27 00:00:06",
            updated_at: "2019-07-27 00:00:07"
        }
    ]);
});
}
