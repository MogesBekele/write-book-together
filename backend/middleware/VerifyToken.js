// middleware/verifyToken.js
import jwt from "jsonwebtoken";

const VerifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Token is missing or improperly formatted" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    req.userId = decoded.id; // Attach userId to the request object
    next();
  });
};

export default VerifyToken;
