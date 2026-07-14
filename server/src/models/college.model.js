const db = require("../config/db");

const College = {
  findAll: async () => {
    const result = await db.query("SELECT * FROM colleges");
    return result.rows;
  },

  findById: async (id) => {
    const result = await db.query("SELECT * FROM colleges WHERE id = $1", [id]);
    return result.rows[0];
  },

  create: async ({ name, location, details }) => {
    const result = await db.query(
      "INSERT INTO colleges (name, location, details) VALUES ($1, $2, $3) RETURNING *",
      [name, location, details]
    );
    return result.rows[0];
  },
};

module.exports = College;
