import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function authenticateToken(req, res, next) {
  const publicRoutes = ["/api/auth/create", "/api/auth/login"];

  // Allow public routes without authentication
  if (publicRoutes.includes(req.path)) {
    return next();
  }

  // Check for Authorization token
  const token = req.header("Authorization")?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.secretkey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    req.user = decoded;
    next(); 
  });
}
