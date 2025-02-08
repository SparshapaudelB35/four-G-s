import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function authenticateToken(req, res, next) {
  // Define public routes
  const publicRoutes = ["/api/auth/create", "/api/auth/login", "/api/tours", "/api/hotel"];

  // Normalize the path by removing query parameters
  const path = req.path.split('?')[0];

  // Allow public routes without authentication
  if (publicRoutes.includes(path)) {
    return next();
  }

  // Extract the token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // Validate the secret key
  if (!process.env.secretkey) {
    console.error("JWT secret key is not defined.");
    return res.status(500).json({ message: "Internal server error." });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.secretkey);
    req.user = decoded; // Attach the decoded user information to the request object
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
}