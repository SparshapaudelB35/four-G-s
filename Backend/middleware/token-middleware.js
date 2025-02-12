import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function authenticateToken(req, res, next) {

  const publicRoutes = ["/api/auth/create", "/api/auth/login", "/api/tour", "/api/hotel",'/api/auth/init','/api/auth/resetpassword' ];

  
  const path = req.path.split('?')[0];

  
  if (publicRoutes.includes(path)) {
    return next();
  }

   
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

 
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

 
  if (!process.env.secretkey) {
    console.error("JWT secret key is not defined.");
    return res.status(500).json({ message: "Internal server error." });
  }

  
  try {
    const decoded = jwt.verify(token, process.env.secretkey);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
}