/**
 * Simple matching algorithm
 * Matches candidate skills to job requirements
 */
function matchCandidateToJob(candidateSkills, jobRequirements) {
  if (!Array.isArray(candidateSkills) || !Array.isArray(jobRequirements)) {
    return 0;
  }

  const matches = candidateSkills.filter((skill) =>
    jobRequirements.includes(skill)
  );

  const score = (matches.length / jobRequirements.length) * 100;
  return Math.round(score);
}

module.exports = {
  matchCandidateToJob,
};
