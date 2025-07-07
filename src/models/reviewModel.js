const db = require("../config/database");

exports.createReview = (companyId, jobSeekerId, reviewData) =>
  new Promise((resolve, reject) => {
    const query = `
      INSERT INTO company_reviews
      (companyId, jobSeekerId, overallRating, workLifeBalance, compensation, culture, careerGrowth,
       title, pros, cons, employmentStatus, jobTitle, yearsWorked, recommendToFriend)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const {
      overallRating,
      ratings,
      title,
      pros,
      cons,
      employmentStatus,
      jobTitle,
      yearsWorked,
      recommendToFriend,
    } = reviewData;

    db.run(
      query,
      [
        companyId,
        jobSeekerId,
        overallRating,
        ratings.workLifeBalance,
        ratings.compensation,
        ratings.culture,
        ratings.careerGrowth,
        title,
        pros,
        cons,
        employmentStatus,
        jobTitle,
        yearsWorked,
        recommendToFriend ? 1 : 0,
      ],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
