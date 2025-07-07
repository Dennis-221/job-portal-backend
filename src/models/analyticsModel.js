const db = require("../config/database");

exports.getJobSeekerAnalytics = (jobSeekerId) =>
  new Promise((resolve, reject) => {
    const now = new Date();
    const monthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    ).toISOString();
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 7);
    const weekStartISO = weekStart.toISOString();

    const result = {};

    // Total Views
    const totalViewsQuery = `SELECT COUNT(*) AS total FROM job_seeker_views WHERE jobSeekerId = ?`;
    db.get(totalViewsQuery, [jobSeekerId], (err, row) => {
      if (err) return reject(err);
      result.totalViews = row.total;

      // Views this month
      const monthViewsQuery = `SELECT COUNT(*) AS count FROM job_seeker_views WHERE jobSeekerId = ? AND viewedAt >= ?`;
      db.get(monthViewsQuery, [jobSeekerId, monthStart], (err2, row2) => {
        if (err2) return reject(err2);
        result.viewsThisMonth = row2.count;

        // Views this week
        const weekViewsQuery = `SELECT COUNT(*) AS count FROM job_seeker_views WHERE jobSeekerId = ? AND viewedAt >= ?`;
        db.get(weekViewsQuery, [jobSeekerId, weekStartISO], (err3, row3) => {
          if (err3) return reject(err3);
          result.viewsThisWeek = row3.count;

          // Viewer Companies
          const companiesQuery = `
            SELECT employers.companyName AS company, COUNT(*) AS views, MAX(viewedAt) AS lastViewed
            FROM job_seeker_views
            JOIN employers ON employers.id = job_seeker_views.employerId
            WHERE job_seeker_views.jobSeekerId = ?
            GROUP BY employers.id
          `;
          db.all(companiesQuery, [jobSeekerId], (err4, companies) => {
            if (err4) return reject(err4);
            result.viewerCompanies = companies;

            // Search appearances
            const searchesQuery = `SELECT COUNT(*) AS count FROM job_seeker_search_appearances WHERE jobSeekerId = ?`;
            db.get(searchesQuery, [jobSeekerId], (err5, row5) => {
              if (err5) return reject(err5);
              result.searchAppearances = row5.count;

              resolve(result);
            });
          });
        });
      });
    });
  });

exports.getJobAnalytics = (jobId) =>
  new Promise((resolve, reject) => {
    const result = {};

    // 1. Total views
    db.get(
      `SELECT COUNT(*) AS views FROM job_views WHERE jobId = ?`,
      [jobId],
      (err, row) => {
        if (err) return reject(err);
        result.views = row.views || 0;

        // 2. Total applications
        db.get(
          `SELECT COUNT(*) AS applications FROM applications WHERE jobId = ?`,
          [jobId],
          (err2, row2) => {
            if (err2) return reject(err2);
            result.applications = row2.applications || 0;

            // 3. Shortlisted count
            db.get(
              `SELECT COUNT(*) AS shortlisted 
               FROM applications 
               WHERE jobId = ? AND status = 'shortlisted'`,
              [jobId],
              (err3, row3) => {
                if (err3) return reject(err3);
                result.shortlisted = row3.shortlisted || 0;

                // 4. Conversion rate
                result.conversionRate = result.views
                  ? ((result.applications / result.views) * 100).toFixed(1) +
                    "%"
                  : "0%";

                // 5. Views per day (last 7 days for example)
                db.all(
                  `SELECT DATE(viewedAt) AS date,
                          COUNT(*) AS views,
                          (SELECT COUNT(*) FROM applications a 
                           WHERE a.jobId = ? 
                             AND DATE(a.appliedOn) = DATE(jv.viewedAt)
                          ) AS applications
                   FROM job_views jv
                   WHERE jobId = ?
                   GROUP BY DATE(viewedAt)`,
                  [jobId, jobId],
                  (err4, rows4) => {
                    if (err4) return reject(err4);
                    result.viewsPerDay = rows4;

                    // 6. Top candidate locations
                    db.all(
                      `SELECT js.currentLocation AS location,
                              COUNT(*) AS count
                       FROM applications a
                       JOIN job_seekers js ON a.jobSeekerId = js.id
                       WHERE a.jobId = ?
                       GROUP BY js.currentLocation
                       ORDER BY count DESC
                       LIMIT 5`,
                      [jobId],
                      (err5, rows5) => {
                        if (err5) return reject(err5);
                        result.topCandidateLocations = rows5;

                        // 7. Skill match summary (mocked or computed elsewhere)
                        // Here you could join a match table; for now, mock:
                        result.skillMatch = {
                          highMatch: 15,
                          mediumMatch: 20,
                          lowMatch: 10,
                        };

                        resolve(result);
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });
