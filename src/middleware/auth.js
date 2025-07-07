const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error("JWT Verification failed:", err);
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired token" });
    }
    console.log("Decoded token:", user);

    // Attach user info to request
    req.user = {
      userId: user.userId,
      userType: user.userType,
    };
    // req.token = token;

    next();
  });
}

module.exports = authenticateToken;
