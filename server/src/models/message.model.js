const db = require("../config/db");

const Message = {
  findConversationMessages: async (contactId) => {
    const result = await db.query(
      "SELECT * FROM messages WHERE contact_id = $1 ORDER BY created_at ASC",
      [contactId]
    );
    return result.rows;
  },

  create: async ({ contactId, sender, text }) => {
    const result = await db.query(
      "INSERT INTO messages (contact_id, sender, text) VALUES ($1, $2, $3) RETURNING *",
      [contactId, sender, text]
    );
    return result.rows[0];
  },
};

module.exports = Message;
