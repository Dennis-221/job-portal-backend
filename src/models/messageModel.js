const db = require("../config/database");

exports.sendMessage = (senderId, recipientId, subject, message, jobId) =>
  new Promise((resolve, reject) => {
    const query = `
      INSERT INTO messages (senderId, recipientId, subject, message, jobId)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(
      query,
      [senderId, recipientId, subject, message, jobId],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });

exports.getMessagesForUser = (userId) =>
  new Promise((resolve, reject) => {
    const query = `SELECT * FROM messages WHERE senderId = ? OR recipientId = ?`;
    db.all(query, [userId, userId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
