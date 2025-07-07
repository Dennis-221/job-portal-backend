/**
 * Very basic mock parser for resume text
 * In production, integrate with NLP/AI
 */
function parseResume(resumeText) {
  // Example: naive keyword extraction
  const skills = [];
  const lowerText = resumeText.toLowerCase();

  if (lowerText.includes("node")) skills.push("Node.js");
  if (lowerText.includes("react")) skills.push("React");
  if (lowerText.includes("sql")) skills.push("SQL");
  if (lowerText.includes("python")) skills.push("Python");

  return {
    extractedSkills: skills,
    wordCount: resumeText.split(/\s+/).length,
  };
}

module.exports = {
  parseResume,
};
