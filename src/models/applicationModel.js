const db = require("../config/database");

exports.createApplication = (jobId, jobSeekerId, resumeId, coverLetter) =>
  new Promise((resolve, reject) => {
    const query = `
      INSERT INTO applications (jobId, jobSeekerId, resumeId, coverLetter)
      VALUES (?, ?, ?, ?)
    `;
    db.run(query, [jobId, jobSeekerId, resumeId, coverLetter], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });

exports.getApplicationsByJobSeeker = (jobSeekerId) =>
  new Promise((resolve, reject) => {
    const query = `
      SELECT a.id, a.status, a.appliedOn, j.title, j.location
      FROM applications a
      JOIN jobs j ON a.jobId = j.id
      WHERE a.jobSeekerId = ?
    `;
    db.all(query, [jobSeekerId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });

exports.updateApplicationStatus = (applicationId, status) =>
  new Promise((resolve, reject) => {
    db.run(
      `UPDATE applications SET status = ? WHERE id = ?`,
      [status, applicationId],
      function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      }
    );
  });

exports.getApplicationsForJob = (jobId) =>
  new Promise((resolve, reject) => {
    const query = `
      SELECT a.id, a.coverLetter, a.status, a.appliedOn, js.name AS candidateName, js.mobile
      FROM applications a
      JOIN job_seekers js ON a.jobSeekerId = js.id
      WHERE a.jobId = ?
    `;
    db.all(query, [jobId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
