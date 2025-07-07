const db = require("../config/database");

// 🟢 Employer searches candidates
exports.searchCandidates = (req, res) => {
  if (req.user.userType !== "employer") {
    return res.status(403).json({ success: false, message: "Access denied" });
  }

  const { keywords, experienceMin, experienceMax } = req.query;

  let query = `SELECT id, name, mobile, workStatus, experienceYears, experienceMonths FROM job_seekers WHERE 1=1`;
  const params = [];

  if (keywords) {
    query += ` AND name LIKE ?`;
    params.push(`%${keywords}%`);
  }

  if (experienceMin) {
    query += ` AND experienceYears >= ?`;
    params.push(experienceMin);
  }

  if (experienceMax) {
    query += ` AND experienceYears <= ?`;
    params.push(experienceMax);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }

    res.json({ success: true, candidates: rows });
  });
};

// 🟢 Jobseeker searches jobs (advanced)
exports.advancedJobSearch = (req, res) => {
  const { keywords, location, experienceMin, experienceMax } = req.query;

  let query = `SELECT * FROM jobs WHERE 1=1`;
  const params = [];

  if (keywords) {
    query += ` AND title LIKE ?`;
    params.push(`%${keywords}%`);
  }

  if (location) {
    query += ` AND location LIKE ?`;
    params.push(`%${location}%`);
  }

  if (experienceMin) {
    query += ` AND experienceMin >= ?`;
    params.push(experienceMin);
  }

  if (experienceMax) {
    query += ` AND experienceMax <= ?`;
    params.push(experienceMax);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }

    res.json({ success: true, jobs: rows });
  });
};
