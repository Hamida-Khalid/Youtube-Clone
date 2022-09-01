import { createError } from "./error.js";
import User from "./models/User.js";
import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authorized"));
  jwt.verify(token, process.env.JWT, (error, User) => {
    if (error) return next(createError(403, "Token is not valid"));
    req.user = User;
    next();
  });
};
