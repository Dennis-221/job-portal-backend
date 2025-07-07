exports.getPlans = () => {
  return {
    jobSeekerPlans: [
      {
        id: 1,
        name: "Premium Job Seeker",
        price: 999,
        duration: "3 months",
        features: [
          "Priority in search results",
          "See recruiter contact info",
          "Know who viewed your profile",
          "Boost your applications",
        ],
      },
    ],
    employerPlans: [
      {
        id: 101,
        name: "Starter Pack",
        credits: 10,
        price: 5000,
        features: [
          "Post 10 jobs",
          "Database access - 50 profiles",
          "Priority listing",
        ],
      },
    ],
  };
};
