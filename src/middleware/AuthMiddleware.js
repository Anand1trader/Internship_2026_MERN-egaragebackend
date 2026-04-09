const jwt = require("jsonwebtoken");

const secret = "secretkey"; // ✅ SAME as login

const validateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided ❌",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Token is not Bearer ❌",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, secret);

    req.user = decoded;

    next();

  } catch (err) {
    res.status(401).json({
      message: "Invalid or expired token ❌",
      error: err.message,
    });
  }
};

module.exports = validateToken;