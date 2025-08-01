var migration1750317015 = {
  up: function (db, handler) {
    var query = `
      CREATE TABLE IF NOT EXISTS user_management (
        id UUID PRIMARY KEY,
        name TEXT,
        email TEXT
      );
    `;
    var params = [];
    db.execute(query, params, { prepare: true }, function (err) {
      if (err) {
        handler(err, false);
      } else {
        handler(false, true);
      }
    });
  },
  down: function (db, handler) {
    var query = `DROP TABLE IF EXISTS user_management;`;
    var params = [];
    db.execute(query, params, { prepare: true }, function (err) {
      if (err) {
        handler(err, false);
      } else {
        handler(false, true);
      }
    });
  },
};
module.exports = migration1750317015;
