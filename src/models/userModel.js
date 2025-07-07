const db = require("../config/database");

exports.createUser = (email, password, userType) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO users (email, password, userType) VALUES (?, ?, ?)`;
    db.run(query, [email, password, userType], function (err) {
      if (err) return reject(err);
      resolve(this.lastID);
    });
  });
};

exports.getUserByEmailAndType = (email, userType) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE email = ? AND userType = ?`;
    db.get(query, [email, userType], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

exports.getJobSeekerProfile = (jobSeekerId) =>
  new Promise((resolve, reject) => {
    const query = `
      SELECT u.id, u.email, js.name, js.mobile, js.workStatus, js.experienceYears, js.experienceMonths
      FROM users u
      JOIN job_seekers js ON u.id = js.id
      WHERE u.id = ?
    `;
    db.get(query, [jobSeekerId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });

exports.updateJobSeekerProfile = (jobSeekerId, profile) =>
  new Promise((resolve, reject) => {
    const query = `
      UPDATE job_seekers
      SET name = ?, mobile = ?, workStatus = ?, experienceYears = ?, experienceMonths = ?
      WHERE id = ?
    `;
    db.run(
      query,
      [
        profile.name,
        profile.mobile,
        profile.workStatus,
        profile.experience?.years || 0,
        profile.experience?.months || 0,
        jobSeekerId,
      ],
      function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      }
    );
  });
