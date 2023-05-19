import jwt from "jsonwebtoken";
import { HTTP_MESSAGES } from "../utils/constants.js";

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    console.log("🚀 ~ file: verifyJWT.js:8 ~ verifyJWT ~ startsWith ERR");
    return res.status(401).json({ message: HTTP_MESSAGES.UNAUTHORIZED });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: HTTP_MESSAGES.FORBIDDEN });
    req.user = {
      email: decoded.UserInfo.email,
      id: decoded.UserInfo.id,
    };
    next();
  });
};
