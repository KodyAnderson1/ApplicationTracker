import express from "express";
import { addUser } from "../controllers/general.js";

const router = express.Router();

// router.get("/user/:id", getUser);
// router.post("/login", getLogin);

router.post("/register", addUser);

export default router;
