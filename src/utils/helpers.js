/**
 * Removes sensitive fields like password from a user object
 */
function sanitizeUser(user) {
  if (!user) return null;
  const { password, ...cleaned } = user;
  return cleaned;
}

/**
 * Standard success JSON response
 */
function successResponse(res, data, message = "Success") {
  res.json({
    success: true,
    message,
    ...data,
  });
}

/**
 * Standard error JSON response
 */
function errorResponse(res, statusCode, message) {
  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = {
  sanitizeUser,
  successResponse,
  errorResponse,
};
