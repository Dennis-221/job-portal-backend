const db = require("../config/database");

exports.createJob = (employerId, job) =>
  new Promise((resolve, reject) => {
    const query = `
      INSERT INTO jobs
      (employerId, title, description, department, location, experienceMin, experienceMax,
       salaryMin, salaryMax, hideSalary, jobType, openings)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      employerId,
      job.title,
      job.description,
      job.department,
      job.location,
      job.experienceMin,
      job.experienceMax,
      job.salaryMin,
      job.salaryMax,
      job.hideSalary ? 1 : 0,
      job.jobType,
      job.openings,
    ];

    db.run(query, params, function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });

exports.getJobsByEmployer = (employerId) =>
  new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM jobs WHERE employerId = ?`,
      [employerId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });

exports.searchJobs = (filters) =>
  new Promise((resolve, reject) => {
    let query = `SELECT * FROM jobs WHERE 1=1`;
    const params = [];

    if (filters.keywords) {
      query += ` AND title LIKE ?`;
      params.push(`%${filters.keywords}%`);
    }
    if (filters.location) {
      query += ` AND location LIKE ?`;
      params.push(`%${filters.location}%`);
    }
    if (filters.experienceMin) {
      query += ` AND experienceMin >= ?`;
      params.push(filters.experienceMin);
    }
    if (filters.experienceMax) {
      query += ` AND experienceMax <= ?`;
      params.push(filters.experienceMax);
    }

    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });

exports.getJobById = (jobId) =>
  new Promise((resolve, reject) => {
    db.get(`SELECT * FROM jobs WHERE id = ?`, [jobId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
