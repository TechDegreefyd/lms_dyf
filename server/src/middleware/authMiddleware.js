const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Access Denied: No Token Provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "super-secret-key");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid Token" });
  }
};
