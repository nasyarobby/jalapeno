
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
        },
        {
            id: 3,
            user_id: 3,
            cookbook_name: "Tasty",
            category: "Salads"
        },
        {
            id: 4,
            user_id: 1,
            cookbook_name: "Redcipes",
            category: "Salads"
        },
        {
            id: 5,
            user_id: 2,
            cookbook_name: "Allrecipes",
            category: "Salads"
        },
        {
            id: 6,
            user_id: 3,
            cookbook_name: "Allrecipes",
            category: "Breakfast"
        },
        {
            id: 7,
            user_id: 1,
            cookbook_name: "Tasty",
            category: "Breakfast"
        },
        {
            id: 8,
            user_id: 2,
            cookbook_name: "Allrecipes",
            category: "Desserts"
        },
        {
            id: 9,
            user_id: 3,
            cookbook_name: "Allrecipes",
            category: "Desserts"
        },
        {
            id: 10,
            user_id: 1,
            cookbook_name: "Redcipes",
            category: "Desserts"
        },
        {
            id: 11,
            user_id: 2,
            cookbook_name: "Allrecipes",
            category: "Appetizer"
        },
        {
            id: 12,
            user_id: 3,
            cookbook_name: "Allrecipes",
            category: "Italian"
        },
        {
            id: 13,
            user_id: 1,
            cookbook_name: "Tasty",
            category: "Sandwich"
        },
        {
            id: 14,
            user_id: 2,
            cookbook_name: "Allrecipes",
            category: "Soups"
        },
        {
            id: 15,
            user_id: 3,
            cookbook_name: "Redcipes",
            category: "Soups"
        },
        {
            id: 16,
            user_id: 1,
            cookbook_name: "Allrecipes",
            category: "Bread"
        }
    ]);
});
}
