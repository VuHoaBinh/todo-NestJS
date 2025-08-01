var migration1751449035 = {
  up: async function (db, handler) {
    try {
      const queries = [
        `ALTER TABLE user_management ADD version int;`,
        `ALTER TABLE user_management ADD createdAt timestamp;`,
        `ALTER TABLE user_management ADD createdBy text;`,
        `ALTER TABLE user_management ADD updatedBy text;`,
        `ALTER TABLE user_management ADD updatedAt timestamp;`,
      ];

      for (const query of queries) {
        await db.execute(query, [], { prepare: true });
      }

      handler(false, true); // Success
    } catch (err) {
      handler(err, false); // Error
    }
  },

  down: async function (db, handler) {
    try {
      const query = `DROP TABLE IF EXISTS user_management;`;
      await db.execute(query, [], { prepare: true });
      handler(false, true); // Success
    } catch (err) {
      handler(err, false); // Error
    }
  },
};

module.exports = migration1751449035;