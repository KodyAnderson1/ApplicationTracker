import express from "express";
import { getUser, addUser, getLogin } from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser);

router.post("/register", addUser);
router.post("/login", getLogin);

export default router;
