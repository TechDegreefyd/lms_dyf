const db = require("../config/db");

const Lead = {
  findAll: async ({ status } = {}) => {
    let query = "SELECT * FROM leads";
    const params = [];
    if (status) {
      query += " WHERE status = $1";
      params.push(status);
    }
    const result = await db.query(query, params);
    return result.rows;
  },

  findById: async (id) => {
    const result = await db.query("SELECT * FROM leads WHERE id = $1", [id]);
    return result.rows[0];
  },

  create: async ({ name, college, course, status, source }) => {
    const result = await db.query(
      "INSERT INTO leads (name, college, course, status, source) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, college, course, status, source]
    );
    return result.rows[0];
  },

  updateStatus: async (id, status) => {
    const result = await db.query(
      "UPDATE leads SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    return result.rows[0];
  },
};

module.exports = Lead;
