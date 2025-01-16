import jwt from "jsonwebtoken";

// Middleware to validate JWT tokens
function addMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ massage: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ massage: "Unauthorized" });
    }
    req.userId = decoded.id;
    next();
  });
}

export default addMiddleware;
