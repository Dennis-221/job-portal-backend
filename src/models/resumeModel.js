const db = require("../config/database");

exports.saveResume = (jobSeekerId, filePath) =>
  new Promise((resolve, reject) => {
    const query = `
      INSERT INTO resumes (jobSeekerId, filePath)
      VALUES (?, ?)
    `;
    db.run(query, [jobSeekerId, filePath], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });

exports.getResumesByJobSeeker = (jobSeekerId) =>
  new Promise((resolve, reject) => {
    const query = `
      SELECT id, filePath, uploadedOn
      FROM resumes
      WHERE jobSeekerId = ?
    `;
    db.all(query, [jobSeekerId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
