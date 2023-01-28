import express from "express";
const router = express.Router();
import { login, logout, refresh } from "../controllers/auth.js";
import loginLimiter from "../middleware/loginLimiter.js";

router.route("/").post(loginLimiter, login);
// router.post("/", loginLimiter, login);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);

export default router;
