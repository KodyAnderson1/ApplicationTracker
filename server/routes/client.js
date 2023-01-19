import { getApplications, getDashboardStats, addNewAplication } from "../controllers/client.js";

import express from "express";

const router = express.Router();

router.get("/applications", getApplications);
router.post("/applications/post", addNewAplication);

router.get("/dashboard/:id", getDashboardStats);

/* THESE NEED TO BE IMPLEMENTED AND IMPORTED */
// router.post("/applications/add", addNewApplication);
// routser.post("/applications/update/:id", updateExistingApplication);

export default router;
