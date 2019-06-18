let hash = require("./../../../libs/hash").hash

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
          id: 1,
          email: 'alice@gmail.com',
          username: 'alice001',
          password: hash('secret'),
          name: 'Alice Peace',
          verification_code: null,
          verification_code_expired_at: null,
          verified_at: new Date("October 19, 2018 11:13:00")
        },
        {
          id: 2,
          email: 'bob@gmail.com',
          username: 'bobby002',
          password: hash('secret'),
          name: 'Bobby Bobo',
          verification_code: null,
          verification_code_expired_at: null,
          verified_at: null
        },
        {
          id: 3,
          email: 'charlie@gmail.com',
          username: 'charlie003',
          password: hash('secret'),
          name: 'Charlie Charlotte',
          verification_code: null,
          verification_code_expired_at: null,
          verified_at: null
        }
      ]);
    });
};