// eslint-disable-next-line no-undef
const bcrypt = require('bcryptjs');

// eslint-disable-next-line no-undef
module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Distruidora FastFeet",
          email: "admin@fastfeet.com",
          password_hash: bcrypt.hashSync("123456", 8),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: () => {}
};
