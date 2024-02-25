const jwt = require("jsonwebtoken");

// Middleware function to validate JWT token
const authenticateToken = (req, res, next) => {
  // Retrieve the JWT token from the Authorization header
  const token = req.headers["x-jwt"];

  // Check if token is present
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(user)
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
    req.user = user; // Attach the decoded user information to the request object
    next(); // Call the next middleware or route handler
  });
};

module.exports = { authenticateToken };
