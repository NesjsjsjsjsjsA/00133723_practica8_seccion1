import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../Security/config.js";

export const signToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};
